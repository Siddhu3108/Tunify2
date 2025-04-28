

// "use client"

// import { useState,useContext } from "react"
// import { assets } from "../assets/frontend-assets/assets"
// import { useNavigate, useLocation } from "react-router-dom"
// import { UserContext } from "./LoginPage"
// // import { UserData } from "./LoginPage"

// const SideBar = () => {
//   const navigate = useNavigate()
//   const location = useLocation()
//   const [isSearchExpanded, setIsSearchExpanded] = useState(false)
//   //  const {isAuth}=useContext(UserContext);
  

//   const toggleSearch = () => {
//     setIsSearchExpanded(!isSearchExpanded)
//     if (!isSearchExpanded) {
//       navigate("/search")
//     }
//   }

//   const isSearchActive = location.pathname.includes("search")

//   return (
//     <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
//       <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
//       {/* <div onClick={() => navigate("/login")} className="flex items-center gap-3 pl-8 cursor-pointer">
//           <img className="w-6" src={assets.home_icon || "/placeholder.svg"} alt="" />
//           <p className="font-bold">Login</p>
//         </div> */}
//         <div onClick={() => navigate("/")} className="flex items-center gap-3 pl-8 cursor-pointer">
//           <img className="w-6" src={assets.home_icon || "/placeholder.svg"} alt="" />
//           <p className="font-bold">Home</p>
//         </div>
//         <div
//           onClick={toggleSearch}
//           className={`flex items-center gap-3 pl-8 cursor-pointer ${isSearchActive ? "text-green-500" : ""}`}
//         >
//           <img className="w-6" src={assets.search_icon || "/placeholder.svg"} alt="" />
//           <p className="font-bold">Search</p>
//         </div>
//       </div>
//       <div className="bg-[#121212] h-[85%] rounded">
//         <div className="p-4 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <img className="w-8" src={assets.stack_icon || "/placeholder.svg"} alt="" />
//             <p onClick={() => {navigate("/playlists");}} className="font-semibold">Your Library</p>
//           </div>
//           <div className="flex items-center gap-3">
//             <img className="w-5" src={assets.arrow_icon || "/placeholder.svg"} alt="" />
//             <img className="w-5" src={assets.plus_icon || "/placeholder.svg"} alt="" />
//           </div>
//         </div>
//         <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
//           <h1>Create your first playlist</h1>
//           <p className="font-light">it's easy we will help you</p>
//           <button onClick={() => {navigate("/create-playlist");}} className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">Create Playlist</button>
//         </div>

        

//         <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
//           <h1>Lets find some podcasts to follow</h1>
//           <p className="font-light">we'll keep you update on new episodes</p>
//           <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">Browse Podcasts</button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SideBar


"use client"

import { useState } from "react"
import { assets } from "../assets/frontend-assets/assets"
import { useNavigate, useLocation } from "react-router-dom"
import PlaylistsPage from "./PlaylistsPage"
import { Heart } from "lucide-react"

const SideBar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [isLibraryExpanded, setIsLibraryExpanded] = useState(true)

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded)
    if (!isSearchExpanded) {
      navigate("/search")
    }
  }

  const isSearchActive = location.pathname.includes("search")
  const isLikedSongsActive = location.pathname.includes("likedSongs")

  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      {/* Home and Search section */}
      <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
        <div onClick={() => navigate("/home")} className="flex items-center gap-3 pl-8 cursor-pointer">
          <img className="w-6" src={assets.home_icon} alt="Home" />
          <p className="font-bold">Home</p>
        </div>
        <div
          onClick={toggleSearch}
          className={`flex items-center gap-3 pl-8 cursor-pointer ${isSearchActive ? "text-green-500" : ""}`}
        >
          <img className="w-6" src={assets.search_icon} alt="Search" />
          <p className="font-bold">Search</p>
        </div>
      </div>

      {/* Library section */}
      <div className={`bg-[#121212] ${isLibraryExpanded ? "flex-1" : "h-auto"} rounded flex flex-col`}>
        {/* Library header */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer hover:text-white transition-colors">
            <img className="w-8" src={assets.stack_icon} alt="Library" />
            <p className="font-semibold">Your Library</p>
          </div>
          <div className="flex items-center gap-3">
            <img 
              className="w-5 cursor-pointer hover:opacity-80 transition-opacity" 
              src={assets.arrow_icon} 
              alt="Expand"
              onClick={() => setIsLibraryExpanded(!isLibraryExpanded)}
            />
            <img 
              className="w-5 cursor-pointer hover:opacity-80 transition-opacity" 
              src={assets.plus_icon} 
              alt="Create"
              onClick={() => navigate("/create-playlist")}
            />
          </div>
        </div>

        {/* Playlists section */}
        <div className="flex-1 flex flex-col overflow-hidden px-2">
          {/* Create Playlist option - styled like Spotify */}
          <div 
            className="flex items-center gap-4 p-2 rounded hover:bg-[#1a1a1a] cursor-pointer transition-colors"
            onClick={() => navigate("/create-playlist")}
          >
            <div className="bg-[#2a2a2a] p-2 rounded-full">
              <img className="w-5 h-5" src={assets.plus_icon} alt="Create playlist" />
            </div>
            <span className="font-medium">Create playlist</span>
          </div>

          {/* Liked Songs option - similar to Spotify */}
          <div
          onClick={() => navigate("/likedSongs")}
          className={`flex items-center gap-3 p-3 mx-2 rounded cursor-pointer hover:bg-[#242424] ${isLikedSongsActive ? "bg-[#242424]" : ""}`}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-purple-700 to-blue-400 flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" fill="white" />
          </div>
          <div>
            <p className="font-semibold">Liked Songs</p>
            <p className="text-xs text-gray-400">Playlist • Your favorite tracks</p>
          </div>
        </div>

          {/* Playlists list */}
          <div className="mt-2">
            <h3 className="text-xs font-semibold text-gray-400 px-2 py-3 uppercase tracking-wider">
              Your Playlists
            </h3>
            <div className="overflow-y-auto">
              <PlaylistsPage vertical={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideBar
