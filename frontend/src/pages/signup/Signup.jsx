import React, { useState } from 'react'
import GenderCheckBox from './GenderCheckBox'
import { Link } from 'react-router-dom'
import useSignup from "../../hooks/useSignup"

const Signup = () => {

  const [inputs , setInputs ] = useState({
    fullname: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: ''
  }) 

  const handleGenderChange = (gender) => {
    setInputs({...inputs, gender  })
  }
  
  const [loading , signup ] =  useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(inputs)
  }



  return (
    <div className='flex flex-col items-center justify-center min-w-96 mc-auto'>   
      <div className=' w-full p-6 rounded-md shadow-md bg-gray-300 bg-clip-padding backdrop-blur-lg bg-opacity-15'>
        <h1 className='text-3xl font-semibold text-center '>Signup</h1>    
    </div>

    <form onSubmit={handleSubmit} >
        <div >
          <label className='label p-2 ' >
            <span className='text-gray-600'>Name</span>
          </label>
            <input type='text' placeholder='Enter Your Name' className='w-full mb-5 input input-bordered h-10'
             value={inputs.name} 
             onChange={(e) => setInputs({...inputs , fullname : e.target.value})}
             />
        </div>

        
        <div>
        <label className='label p-2 ' >
            <span className='text-gray-600'>username</span>
          </label>
          <input type='text' placeholder='Enter Your username' className='w-full mb-5 input input-bordered h-10' 
          value={inputs.username}
          onChange={(e) => setInputs({...inputs, username : e.target.value})}
          />
        </div>

        <div>
        <label className='label p-2 ' >
            <span className='text-gray-600'>password</span>
          </label>
          <input type='text' placeholder='Enter Your Name' className='w-full mb-5 input input-bordered h-10' 
          value={inputs.password}
          onChange={(e) => setInputs({...inputs, password : e.target.value})}
          />
        </div>

        
        <div>
        <label className='label p-2 ' >
            <span className='text-gray-600'>confirm  password </span>
          </label>
          <input type='text' placeholder='Confirm your password ' className='w-full mb-5 input input-bordered h-10'
          value={inputs.confirmPassword}
          onChange={(e)=> setInputs({...inputs , confirmPassword : e.target.value})}
          />
        </div>

        <GenderCheckBox  onCheckboxChange = {handleGenderChange} selectedGender={inputs.gender} />


      <Link to="/login" className='text-sm hover:underline hover:text-blue-500 mt-4 '>Already have an acount</Link >

      <div>
        <button className='w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600'>

          {loading ? <span className='loading loading-spinner'></span> : "Sign-Up" }
        </button>
      </div>

    </form>
    </div>
  )
}

export default Signup
    