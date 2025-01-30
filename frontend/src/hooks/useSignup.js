import React, { useState } from 'react'
import {Toaster , toast}  from "react-hot-toast"
import { useAuthContext } from '../context/AuthContext'

const useSignup = () => {
    const [loading , setLoading ] = useState(false) 

    const {authUser , setAuthUser } =   useAuthContext()

    const signup = async ({fullname , username , password , confirmPassword , gender }) => {
        const success = handleInputError({fullname , username , password , confirmPassword , gender })

        if(!success ) return ;

        try{
            const res = await fetch("/api/auth/signup/", {
                method : "POST",
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    fullname , username , password ,  confirmPassword ,  gender
                })
            })
            const data = await res.json()


            if(data.error) {
                throw new Error(data.error.message)
            }

            // setting up local storage 
            localStorage.setItem("chat-app" ,JSON.stringify(data))
            // setting context 
            setAuthUser(data)


        }catch(error ){
            toast.error("An error occurred while signing up")
        }finally{
            setLoading(false)
        }

    }
    return [ loading ,signup ] 
}

export default useSignup


const handleInputError = ({fullname , username , password , confirmPassword , gender }) => {
    if(!fullname || !username || !password || !confirmPassword || !gender ){
        toast.error("Please enter all the fields")
        return false
    }

    if(password !== confirmPassword ) {
        toast.error("Passwords do not match")
        return false
    }

    if(password.length < 8 ){
        toast.error("Password must be at least 8 characters long")
        return false
    }

    return true 
} 