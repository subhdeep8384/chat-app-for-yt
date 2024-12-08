import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie = (userId , res ) => {
    const token = jwt.sign({ id : userId }, process.env.JWT_SECRET, { expiresIn : '15d' });

    res.cookie("token" , token , {
        expires : new Date(Date.now() + 1000 * 60 * 60 * 24 * 15),
        httpOnly : true,
        sameSite : "strict",
        secure : process.env.NODE_ENV !== "development" ,
       
    })
}

export default  generateTokenAndSetCookie