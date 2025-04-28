import React, { useContext } from 'react'
import { assets } from '../assets/frontend-assets/assets'
import {useNavigate} from 'react-router-dom'
import { UserData } from '../context/User'

const Navbar = () => {

  const navigate = useNavigate()
  const {isAuth,logoutUser,setIsAuth}=UserData()
 

  return (
    <>
        <div className='w-full flex justify-between items-center font-semibold'>
            <div className='flex items-center gap-2'>
                <img onClick={()=>navigate(-1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_left} alt="" />
                <img onClick={()=>navigate(+1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_right} alt="" />
            </div>
            <div className='flex items-center gap-4'>
              <p className='bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer'>Explore Premium</p>
              <p className='bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer'>Install App</p>
              
              {/* {console.log(isAuth)} */}
              {isAuth? <p  onClick={logoutUser}   className='bg-purple-500 text-black w-20 h-7 rounded-2xl flex items-center justify-center cursor-pointer'>Logout</p>:<p onClick={() => {navigate("/login");}}   className='bg-purple-500 text-black w-20 h-7 rounded-2xl flex items-center justify-center cursor-pointer'>{isAuth?"Logout":"Login"}</p>}
            </div>
        </div>
        <div className='flex items-center gap-2 mt-4'>
          <p className='bg-white text-black px-4 py-1 rounded-2xl'>All</p>
          <p className='bg-black px-4 py-1 rounded-2xl'>Music</p>
          <p className='bg-black px-4 py-1 rounded-2xl'>Podcasts</p>
        </div>
    </>
  )
}

export default Navbar