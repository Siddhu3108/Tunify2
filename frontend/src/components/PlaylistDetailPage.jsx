"use client"

import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { PlayerContext } from "../context/PlayerContext"
import { assets } from "../assets/frontend-assets/assets"
import { useCookies } from "react-cookie"
import axios from "axios"
import { url } from "../App"
import { toast } from "react-toastify"


const PlaylistDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { playWithId } = useContext(PlayerContext)
  const [cookies] = useCookies(["token"]);

  const [playlist, setPlaylist] = useState(null)
  const [tracks, setTracks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
  })

  useEffect(() => {
    // Simulate fetching playlist details from an API
    const fetchPlaylistDetails = async () => {
      setIsLoading(true)
      try {
        // Simulate API delay
        console.log(cookies)
                let token=cookies.token;
                console.log(id)
                console.log(`${url}/api/playlist/mysongs/${id}`)
                // Simulate API delay
                // await new Promise((resolve) => setTimeout(resolve, 1000))
                const response = await axios.get(`${url}/api/playlist/mysongs/${id}`, {
                  headers: {
                    // 'Content-Type': 'multipart/form-data', // 🛠️ Important
                    Authorization: `Bearer ${token}`,
                  },
                });
                console.log(response.data.songs);
                  if (response.data.success) {
                    
                } else {
                       toast.error("Failed to load albums");
                }

        // Mock data - in a real app, this would come from your API
        const mockPlaylist = {
          id,
          name: "Chill Vibes",
          description: "Relaxing tunes for your downtime",
          coverImage: "/placeholder.svg?height=300&width=300",
          createdAt: "2023-05-15",
          updatedAt: "2023-08-22",
          trackCount: 24,
          duration: "1 hr 42 min",
          createdBy: "Your Name",
        }

        const mockTracks = Array(24)
          .fill(null)
          .map((_, index) => ({
            id: `track-${index}`,
            title: `Track ${index + 1}`,
            artist: `Artist ${Math.floor(Math.random() * 10) + 1}`,
            album: `Album ${Math.floor(Math.random() * 5) + 1}`,
            duration: `${Math.floor(Math.random() * 4) + 1}:${Math.floor(Math.random() * 60)
              .toString()
              .padStart(2, "0")}`,
            addedAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
            plays: Math.floor(Math.random() * 1000),
          }))

        setPlaylist(response.data)
        setTracks(mockTracks)
        setEditForm({
          name: mockPlaylist.name,
          description: mockPlaylist.description,
        })
      } catch (error) {
        console.error("Error fetching playlist details:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPlaylistDetails()
  }, [id])

  const handleEditSubmit = async (e) => {
    e.preventDefault()

    // Simulate API call to update playlist
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Update local state
      setPlaylist({
        ...playlist,
        name: editForm.name,
        description: editForm.description,
        updatedAt: new Date().toISOString(),
      })

      // Exit edit mode
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating playlist:", error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditForm({
      ...editForm,
      [name]: value,
    })
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="flex items-center gap-6 mb-8">
          <div className="bg-[#282828] w-48 h-48 rounded-md"></div>
          <div className="flex-1">
            <div className="bg-[#282828] h-8 w-48 rounded mb-4"></div>
            <div className="bg-[#282828] h-6 w-96 rounded mb-2"></div>
            <div className="bg-[#282828] h-4 w-64 rounded"></div>
          </div>
        </div>

        <div className="bg-[#282828] h-10 w-full rounded mb-6"></div>

        {Array(5)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="flex items-center gap-4 py-3 border-b border-[#2a2a2a]">
              <div className="bg-[#282828] h-4 w-4 rounded"></div>
              <div className="bg-[#282828] h-12 w-12 rounded"></div>
              <div className="flex-1">
                <div className="bg-[#282828] h-5 w-48 rounded mb-2"></div>
                <div className="bg-[#282828] h-4 w-32 rounded"></div>
              </div>
              <div className="bg-[#282828] h-4 w-16 rounded"></div>
            </div>
          ))}
      </div>
    )
  }

  if (!playlist) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <h2 className="text-2xl font-bold mb-2">Playlist not found</h2>
        <p className="text-gray-400 mb-6">The playlist you're looking for doesn't exist or has been removed</p>
        <button
          onClick={() => navigate("/playlists")}
          className="px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors font-medium"
        >
          Go to Your Playlists
        </button>
      </div>
    )
  }

  return (
    <div className="pb-20">
      {/* Playlist Header */}
      <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-8">
        <div className="w-48 h-48 shadow-lg">
          <img
            src={playlist.image || "/placeholder.svg"}
            alt={playlist.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <p className="text-sm uppercase font-bold">Playlist</p>

          {isEditing ? (
            <form onSubmit={handleEditSubmit} className="mt-2">
              <input
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleInputChange}
                className="bg-[#333333] text-white text-4xl font-bold mb-4 w-full px-3 py-2 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Playlist name"
                required
              />
              <textarea
                name="description"
                value={editForm.description}
                onChange={handleInputChange}
                className="bg-[#333333] text-white w-full px-3 py-2 rounded focus:ring-2 focus:ring-green-500 focus:outline-none resize-none"
                placeholder="Add an optional description"
                rows={3}
              ></textarea>

              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-black rounded-full hover:bg-green-400 transition-colors"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false)
                    setEditForm({
                      name: playlist.name,
                      description: playlist.description,
                    })
                  }}
                  className="px-4 py-2 bg-transparent border border-white text-white rounded-full hover:bg-[#333333] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <h1 className="text-4xl font-bold mb-4">{playlist.name}</h1>
              <p className="text-gray-400 mb-2">{playlist.desc}</p>
              <div className="flex flex-wrap items-center gap-1 text-sm text-gray-400">
                <span className="font-semibold text-white">{playlist.createdBy}</span>
                <span>•</span>
                <span>{playlist.trackCount} songs,</span>
                <span>{playlist.duration}</span>
                <span>•</span>
                <span>Updated {formatDate(playlist.updatedAt)}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 mb-8">
        <button className="w-12 h-12 flex items-center justify-center bg-green-500 rounded-full hover:scale-105 transition-transform">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-black"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
        )}

        <button className="text-gray-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Tracks Table */}
      <div className="w-full">
        <div className="grid grid-cols-[16px_1fr_1fr_minmax(120px,1fr)] gap-4 px-4 py-2 border-b border-[#2a2a2a] text-gray-400 text-sm">
          <div className="text-center">#</div>
          <div>Title</div>
          <div>Album</div>
          <div className="text-right">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline-block"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {tracks.map((track, index) => (
          <div
            key={track.id}
            className="grid grid-cols-[16px_1fr_1fr_minmax(120px,1fr)] gap-4 px-4 py-3 border-b border-[#2a2a2a] hover:bg-[#2a2a2a] group"
            onClick={() => playWithId(track.id)}
          >
            <div className="flex items-center justify-center text-gray-400 group-hover:text-white">
              <span className="group-hover:hidden">{index + 1}</span>
              <img
                src={assets.play_icon || "/placeholder.svg"}
                alt="Play"
                className="w-4 h-4 hidden group-hover:block"
              />
            </div>
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium truncate">{track.title}</div>
                <div className="text-gray-400 text-sm truncate">{track.artist}</div>
              </div>
            </div>
            <div className="flex items-center text-gray-400 truncate">{track.album}</div>
            <div className="flex items-center justify-end text-gray-400">{track.duration}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlaylistDetailPage
