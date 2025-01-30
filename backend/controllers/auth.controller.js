import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import generateTokenAndSet from "../utils/generatetoken.js"


export const signup = async (req , res ) =>{
    try {
        const {fullname , username , password , confirmPassword , gender } = req.body ;
        if(password !== confirmPassword ){
            return res.status(400).json({
                message : "Passwords do not match" ,
                error : true ,
                success : false 
            })
        }

        const user = await User.findOne({username});
        if(user){
            res.status(400).json({
                message :"User already exists" ,
                error : true,
                success : false
            })
        } 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newuser = new User ({
            fullname ,  
            username ,
            password : hashedPassword ,
            gender,
            profilepicture : gender === 'male'? boyProfilePic : girlProfilePic,
        })

        await newuser.save();
        await generateTokenAndSet(newuser._id , res) ;


        res.status(201).json({
          _id : newuser._id ,
          fullname : newuser.fullname,
          username : newuser.username,
          profilepicture : newuser.profilepicture,
          password : newuser.password ,
          message : "User created successfully",
          error : false,
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json("Server Error")
    }
}

export const login = async  (req , res ) =>{
   try {
        const { username , password  } = req.body ;

        const user = await User.findOne({username}) ;
        const isPasswordCorrect = await bcrypt.compare(password , user?.password || "");

        if(!user ||!isPasswordCorrect){
            return res.status(400).json({
                message : "Invalid credentials",
                error : true,
                success : false
            })
        }

        generateTokenAndSet(user._id , res ) ;
        res.status(200).json({
            data : user 
        })


   } catch (error) {
    return  res.status(500).json({
        message : "Server Error",
        error : true,
        success : false  ,
    })
   }
}

export const logout = async (req , res ) =>{
   try {
    
    res.cookie("token" , "" ,  { expires : new Date(Date.now() + 0)}).json({
        message : "Logged out successfully",
        error : false,
        success : true,
        data : null,
    })
   } catch (error) {
        res.status(500).json({
            message : "Server Error",
            error : true,
            success : false  ,
        })
   }
}