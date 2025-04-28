// import React from 'react'
// import {assets} from '../assets/frontend-assets/assets'
// import {useNavigate} from 'react-router-dom'

// const SideBar = () => {

//   const navigate = useNavigate();

//   return (
//     <div className='w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex'>
//       <div className='bg-[#121212] h-[15%] rounded flex flex-col justify-around'>
//         <div onClick={()=>navigate('/')} className='flex items-center gap-3 pl-8 cursor-pointer'>
//           <img className='w-6' src={assets.home_icon} alt="" />
//           <p className='font-bold'>Home</p>
//         </div>
//         <div className='flex items-center gap-3 pl-8 cursor-pointer'>
//           <img className='w-6' src={assets.search_icon} alt="" />
//           <p className='font-bold'>Search</p>
//         </div>
//       </div>
//       <div className='bg-[#121212] h-[85%] rounded'>
//         <div className='p-4 flex items-center justify-between'>
//           <div className='flex items-center gap-3'>
//             <img className='w-8' src={assets.stack_icon} alt="" />
//             <p className='font-semibold'>Your Library</p>
//           </div>
//           <div className='flex items-center gap-3'>
//             <img className='w-5' src={assets.arrow_icon} alt="" />
//             <img className='w-5' src={assets.plus_icon} alt="" />
//           </div>
//         </div>
//         <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4'>
//             <h1>Create your first playlist</h1>
//             <p className='font-light'>it's easy we will help you</p>
//             <button className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4'>Create Playlist</button>
//         </div>
//         <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4'>
//             <h1>Lets find some podcasts to follow</h1>
//             <p className='font-light'>we'll keep you update on new episodes</p>
//             <button className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4'>Browse Podcasts</button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SideBar


"use client"

import { useState,useContext } from "react"
import { assets } from "../assets/frontend-assets/assets"
import { useNavigate, useLocation } from "react-router-dom"
import { UserContext } from "./LoginPage"
// import { UserData } from "./LoginPage"

const SideBar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  //  const {isAuth}=useContext(UserContext);
  

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded)
    if (!isSearchExpanded) {
      navigate("/search")
    }
  }

  const isSearchActive = location.pathname.includes("search")

  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
      {/* <div onClick={() => navigate("/login")} className="flex items-center gap-3 pl-8 cursor-pointer">
          <img className="w-6" src={assets.home_icon || "/placeholder.svg"} alt="" />
          <p className="font-bold">Login</p>
        </div> */}
        <div onClick={() => navigate("/")} className="flex items-center gap-3 pl-8 cursor-pointer">
          <img className="w-6" src={assets.home_icon || "/placeholder.svg"} alt="" />
          <p className="font-bold">Home</p>
        </div>
        <div
          onClick={toggleSearch}
          className={`flex items-center gap-3 pl-8 cursor-pointer ${isSearchActive ? "text-green-500" : ""}`}
        >
          <img className="w-6" src={assets.search_icon || "/placeholder.svg"} alt="" />
          <p className="font-bold">Search</p>
        </div>
      </div>
      <div className="bg-[#121212] h-[85%] rounded">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img className="w-8" src={assets.stack_icon || "/placeholder.svg"} alt="" />
            <p onClick={() => {navigate("/playlists");}} className="font-semibold">Your Library</p>
          </div>
          <div className="flex items-center gap-3">
            <img className="w-5" src={assets.arrow_icon || "/placeholder.svg"} alt="" />
            <img className="w-5" src={assets.plus_icon || "/placeholder.svg"} alt="" />
          </div>
        </div>
        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
          <h1>Create your first playlist</h1>
          <p className="font-light">it's easy we will help you</p>
          <button onClick={() => {navigate("/create-playlist");}} className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">Create Playlist</button>
        </div>

        

        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
          <h1>Lets find some podcasts to follow</h1>
          <p className="font-light">we'll keep you update on new episodes</p>
          <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">Browse Podcasts</button>
        </div>
      </div>
    </div>
  )
}

export default SideBar

