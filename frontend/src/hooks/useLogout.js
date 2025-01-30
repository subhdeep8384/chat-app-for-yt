
import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import toast from "react-hot-toast"

const useLogout = () => {
    const [loading , setLoading] = useState(false) 
    const { setAuthUser }  = useAuthContext()



    const logout = async () => {
        setLoading(true)
        try{
    
            const res = await fetch("api/auth/logout", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                }
            })

            const data = res.json() 
            if(data.error){
                toast.error(data.message)
                setLoading(false)  // Reset loading state on error
                return  // Stop further execution of the function
            }

            localStorage.removeItem("chat-app")
            setAuthUser(null)
            toast.success("Logged out successfully")
            
    
        }catch(err){
            toast.error("Failed to logout")
            setLoading(false)  // Reset loading state on error
            return  // Stop further execution of the function
        }finally{
            setLoading(false)
        }
    }
    
    return [ loading , logout ]
}

export default useLogout
