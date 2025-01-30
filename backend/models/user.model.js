import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    fullname : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 50,
    },
    username : {
        type : String,
        required : true,
        unique : true,
        minlength : 3,
        maxlength : 20,
    },
    password : {
        type : String,
        required : true,
        minlength : 8,
        maxlength : 100,
    },
    gender : {
        type : String,
        required : true,
        enum : ['male', 'female', 'Other'],
    },

    profilepicture : {
        type : String,
        default : '',
    },
} , {timestamps : true})

const User = mongoose.model("User" , userSchema) ;
export default User ;