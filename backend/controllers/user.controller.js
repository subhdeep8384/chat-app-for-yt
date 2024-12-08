import User from "../models/user.model.js"


export const getUsersForSideBar = async (req , res )=> {
    try {
        const loggedInUserId = req.user._id ;
        const users = await User.find({ _id : {$ne : loggedInUserId }}).select("-password");


        res.json({
            users,
            success : true,
            message : "Users fetched successfully",
        })
    } catch (error) {
        res.status(500).json({
            message : "There is error in get users for side bar route" ,
            error : true,
            success : false,
        })
    }
}