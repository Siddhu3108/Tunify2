"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { assets } from "../assets/frontend-assets/assets"
import axios from "axios"
import { url } from "../App"
import { useCookies } from "react-cookie"
import {toast} from "react-toastify"

const PlaylistsPage = () => {
  const navigate = useNavigate()
  const [playlists, setPlaylists] = useState([])
  const [isLoading, setIsLoading] = useState(true)
    const [cookies] = useCookies(["token"]);
  

  useEffect(() => {
    // Simulate fetching playlists from an API
    const fetchPlaylists = async () => {
      setIsLoading(true)
      try {
        console.log(cookies)
        let token=cookies.token;
        // Simulate API delay
        // await new Promise((resolve) => setTimeout(resolve, 1000))
        const response = await axios.get(`${url}/api/playlist/myplaylists`, {
          headers: {
            // 'Content-Type': 'multipart/form-data', // 🛠️ Important
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.data);
        setPlaylists(response.data.data)
          if (response.data.success) {
            
            console.log(playlists)
        } else {
               toast.error("Failed to load albums");
        }

        // Mock data - in a real app, this would come from your API
        // const mockPlaylists = [
        //   {
        //     id: "1",
        //     name: "Chill Vibes",
        //     description: "Relaxing tunes for your downtime",
        //     coverImage: "/placeholder.svg?height=300&width=300",
        //     songCount: 24,
        //     createdAt: "2023-05-15",
        //   },
        //   {
        //     id: "2",
        //     name: "Workout Mix",
        //     description: "High energy tracks to keep you motivated",
        //     coverImage: "/placeholder.svg?height=300&width=300",
        //     songCount: 18,
        //     createdAt: "2023-06-22",
        //   },
        //   {
        //     id: "3",
        //     name: "Focus & Study",
        //     description: "Concentration-enhancing music",
        //     coverImage: "/placeholder.svg?height=300&width=300",
        //     songCount: 32,
        //     createdAt: "2023-07-10",
        //   },
        // ]

        // setPlaylists(mockPlaylists)
      } catch (error) {
        console.error("Error fetching playlists:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPlaylists()
  }, [])

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Playlists</h1>
        <button
          onClick={() => navigate("/create-playlist")}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-black rounded-full hover:bg-green-400 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          New Playlist
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="bg-[#181818] p-4 rounded-lg animate-pulse">
              <div className="bg-[#282828] w-full aspect-square rounded-md mb-4"></div>
              <div className="bg-[#282828] h-6 w-3/4 rounded mb-2"></div>
              <div className="bg-[#282828] h-4 w-1/2 rounded"></div>
            </div>
          ))}
        </div>
      ) : playlists.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-colors cursor-pointer"
              onClick={() => navigate(`/playlist/${playlist._id}`)}
            >
              <div className="relative group mb-4">
                <img
                  src={playlist.image || "/placeholder.svg"}
                  alt={playlist.name}
                  className="w-full aspect-square object-cover rounded-md shadow-lg"
                />
                <button className="absolute bottom-2 right-2 bg-green-500 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                  <img src={assets.play_icon || "/placeholder.svg"} alt="Play" className="w-4 h-4" />
                </button>
              </div>
              <h3 className="font-bold text-white truncate">{playlist.name}</h3>
              <p className="text-gray-400 text-sm line-clamp-2 h-10">{playlist.desc}</p>
              <p className="text-gray-500 text-xs mt-2">{playlist.songs.length} songs</p>
            </div>
          ))}

          {/* Create Playlist Card */}
          <div
            className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-colors cursor-pointer flex flex-col items-center justify-center"
            onClick={() => navigate("/create-playlist")}
          >
            <div className="w-full aspect-square bg-[#282828] rounded-md flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="font-bold text-white">Create Playlist</h3>
            <p className="text-gray-400 text-sm text-center mt-2">Add a new collection of your favorite tracks</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="bg-[#282828] p-6 rounded-full mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Create your first playlist</h2>
          <p className="text-gray-400 mb-6 text-center max-w-md">
            It's easy to organize your favorite music into playlists for any mood or occasion
          </p>
          <button
            onClick={() => navigate("/create-playlist")}
            className="px-6 py-3 bg-green-500 text-black rounded-full hover:bg-green-400 transition-colors font-medium"
          >
            Create Playlist
          </button>
        </div>
      )}
    </div>
  )
}

export default PlaylistsPage
