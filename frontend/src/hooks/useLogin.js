import { useState } from 'react'
import toast from "react-hot-toast"
import { useAuthContext } from '../context/AuthContext'

const useLogin = () => {
 const [loading , setLoading ] = useState(false)
  const {setAuthUser }  = useAuthContext()

 const login = async (username , password ) => {
    setLoading(true)

    try{
        const res = await fetch("api/auth/login" ,{
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({ username , password })
        })

        const data =  await res.json() ;
        if(data.error){
            throw new Error(error)
        }
        localStorage.setItem("chat-app" , JSON.stringify(data))

        setAuthUser(data)
        toast.success("Logged in successfully")
     
    }catch(error) {
        setLoading(false)
        return toast.error(error.message)
    }finally{
        setLoading(false)
    }
 }

 return {loading , login }
}

export default useLogin
