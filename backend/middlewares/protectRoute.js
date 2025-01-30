import jwt from "jsonwebtoken"
import User from "../models/user.model.js";


const protectRoute = async  (req , res , next ) => {
    try {
        const token = req.cookies.token ; 
        
        if(!token ) {
            return res.status(401).json({
                message : "You are not logged in" ,
                error : true ,
                success : false
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded) {
            return res.status(401).json({
                message : "Token is invalid" ,
                error : true ,
                success : false
            })
        }
        const id = decoded.id
        const user = await User.findById(decoded.id).select("-password") ;
        if(!user){
            return res.status(401).json({
                message : "User not found" ,
                error : true ,
                success : false
            })
        }

        req.user = user ;
        next() ;

    } catch (error) {
        return res.status(401).json({
            message : "You are not authorized to access this route" ,
            error : true ,
            success : false
        })
    }
}

export default protectRoute ;