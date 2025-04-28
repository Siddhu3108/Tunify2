"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { assets } from "../assets/frontend-assets/assets"
import axios from "axios"
import { url } from "../App"
import { useCookies } from "react-cookie"
import { toast } from "react-toastify"

const PlaylistsPage = ({ vertical = false }) => {
  const navigate = useNavigate()
  const [playlists, setPlaylists] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [cookies] = useCookies(["token"])

  useEffect(() => {
    const fetchPlaylists = async () => {
      setIsLoading(true)
      try {
        let token = cookies.token
        const response = await axios.get(`${url}/api/playlist/myplaylists`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setPlaylists(response.data.data)
        if (!response.data.success) {
          toast.error("Failed to load playlists")
        }
      } catch (error) {
        console.error("Error fetching playlists:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPlaylists()
  }, [])

  if (vertical) {
    return (
      <div className="space-y-2 pb-4">
        {isLoading ? (
          Array(5).fill(0).map((_, index) => (
            <div key={index} className="flex items-center gap-3 p-2 bg-[#181818] rounded animate-pulse">
              <div className="w-12 h-12 bg-[#282828] rounded"></div>
              <div className="flex-1">
                <div className="h-4 bg-[#282828] rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-[#282828] rounded w-1/2"></div>
              </div>
            </div>
          ))
        ) : playlists.length > 0 ? (
          playlists.map((playlist) => (
            <div
              key={playlist._id}
              className="flex items-center gap-3 p-2 bg-[#181818] rounded hover:bg-[#282828] transition-colors cursor-pointer"
              onClick={() => navigate(`/playlist/${playlist._id}`)}
            >
              <img
                src={playlist.image || "/placeholder.svg"}
                alt={playlist.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-white text-sm truncate">{playlist.name}</h3>
                <p className="text-gray-400 text-xs">Playlist • {playlist.songs.length} songs</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-400 text-sm">
            No playlists yet
          </div>
        )}
      </div>
    )
  }

  // Default horizontal layout (if needed elsewhere)
  return (
    <div className="w-full">
      {/* ... existing horizontal layout code ... */}
    </div>
  )
}

export default PlaylistsPage