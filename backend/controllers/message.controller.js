import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"
import User from "../models/user.model.js";
export const sendMessage = async (req , res ) => {
    try {
        const { message } = req.body; 
        
        const { id : receiverId  } = req.params ;
        const senderId = req.user._id ;
        
     

        const conversation =  await Conversation.findOne({
            participants : {$all :  [senderId, receiverId]},
        })
       

        if(!conversation ) {
            conversation = await Conversation.create({
                participants : [senderId, receiverId],
            })
        }
      

        const newMessage = new Message({
            senderId,
            receiverId : receiverId ,
            message ,
        })
       


        if(newMessage) {
            conversation.messages.push(newMessage) 
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        
        
        res.status(201).json({
            message : "Message sent successfully",
            error : false,
            success : true,
            data : newMessage  ,
            conversation : conversation  ,
            conversationId : conversation._id  ,
        }) 


    } catch (error) {
        res.status(500).json({
            message : error,
            error : true,
            success : false,
        })
    }
}

export const getMessage = async (req , res ) => {
    try {

        const {id : usertochat} = req.params ;
        const senderId = req.user._id ;
        const conversation = await Conversation.findOne({
            participants : {$all :  [senderId, usertochat]},
        }).populate("messages")

        if(!conversation){
            res.status(500).json({
                message : "No conversation found",
                error : true,
                success : false,
            })
        }

        res.status(200).json({
            message : "Conversation fetched successfully",
            error : false,
            success : true,
            data : conversation  ,
            conversationId : conversation._id  ,
        })
 
    } catch (error) {
        res.status(500).json({
            message : "There is error in get message route" ,
            error : true ,
            success : false,
        })
    }
}