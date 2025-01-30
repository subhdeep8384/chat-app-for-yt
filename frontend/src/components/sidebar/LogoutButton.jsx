import React from 'react'
import { CiLogout } from "react-icons/ci";
import useLogout from '../../hooks/useLogout';

const LogoutButton = () => {
  const [loading, logout] = useLogout();

  return (
    <div className='flex justify-center items-center'>
      {
        !loading ? (
          <CiLogout 
            className='text-white cursor-pointer text-2xl sm:text-3xl md:text-4xl lg:text-5xl' 
            onClick={logout}
          />
        ) : (
          <span className='loading loading-spinner'></span>
        )
      }
    </div>
  )
}

export default LogoutButton
