import React, { useState } from 'react'
import { Routes, Route , Link } from "react-router-dom";
import toast from "react-hot-toast"
import useLogin from '../../hooks/useLogin';

const Login = () => {

    const [ username , setUsername ] = useState("")
    const [ password , setPassword ]  = useState("")
    const {loading , login} =  useLogin()

    const  handleSubmit = async (e) =>{

        e.preventDefault() ;
       await login(username , password )
    }
   return (
    <div className='flex flex-col items-center justify-center  min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-300 bg-clip-padding backdrop-blur-lg bg-opacity-15'>
            <h1 className='text-3xl font-semibold text-center text-gray-300 '>Login
            </h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label className='label p-2 ' >
                        <span className='text-base label-text '>Username </span>
                    </label>
                    <input type="text" placeholder='Enter Your Username' className='w-full input input-bordered h-10'
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}   
                    /> 
                </div>

                <div>
                    <label className='label p-2 '>
                        <span className='text-base label-text '>Password </span>
                    </label>
                    <input type="password" placeholder='Enter Your Password' className='w-full mb-5 input input-bordered h-10' 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />

                </div>

                <div>
                <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg w-full mb-5" disabled={loading}>
                    {loading ? <span className='loading loading-spinner'></span> : "Login" }
                </button>
                </div>
           
                <Link to="/signup" className="link link-info">Don't have an account</Link>
               

                
            </form>
        </div>
    </div>
  )
}

export default Login
