"use client"

import { useContext, useState, useEffect } from "react"
import { PlayerContext } from "../context/PlayerContext"
import { Heart, Clock, MoreHorizontal, Play, Pause } from "lucide-react"
import { useCookies } from "react-cookie"
import { url } from "../App"
import axios from "axios"

const LikedSongsPage = () => {
  const { songsData, playWithId, track, playStatus, play, pause } = useContext(PlayerContext)
  const [likedSongs, setLikedSongs] = useState([])
  const [isHovering, setIsHovering] = useState(null)
  const [cookies] = useCookies(["token"]);


  // In a real app, this would come from an API or user preferences
  // For now, we'll simulate liked songs with the first 8 songs from songsData
  useEffect(() => {
    const fetchlikedSongDetails = async () => {
        // setIsLoading(true)
        try {
          // Simulate API delay
          console.log(cookies)
                  let token=cookies.token;
                  console.log(`${url}/api/likedSongs/liked`)
                  // Simulate API delay
                  // await new Promise((resolve) => setTimeout(resolve, 1000))
                  const response = await axios.get(`${url}/api/likedSongs/liked`, {
                    headers: {
                      // 'Content-Type': 'multipart/form-data', // 🛠️ Important
                      Authorization: `Bearer ${token}`,
                    },
                  });
                  console.log(response.data.likedSongs);
                  setLikedSongs(response.data.likedSongs);
                    if (response.data.success) {
                      
                  } else {
                         toast.error("Failed to load albums");
                  }
  
          // Mock data - in a real app, this would come from your A
  
        //   setPlaylist(response.data)
        //   setTracks(response.data.songs)
        } catch (error) {
          console.error("Error fetching playlist details:", error)
        } finally {
        //   setIsLoading(false)
        }
      }
  
      fetchlikedSongDetails()
    }, [])

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const handlePlayPause = (songId) => {
    if (track?._id === songId && playStatus) {
      pause()
    } else if (track?._id === songId) {
      play()
    } else {
      playWithId(songId)
    }
  }

  return (
    <div className="flex flex-col h-full pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
        <div className="w-48 h-48 bg-gradient-to-br from-purple-700 to-blue-400 flex items-center justify-center shadow-xl">
          <Heart className="w-24 h-24 text-white" fill="white" />
        </div>
        <div className="flex flex-col items-center md:items-start">
          <p className="text-sm text-gray-400 uppercase">Playlist</p>
          <h1 className="text-4xl md:text-7xl font-bold mb-4">Liked Songs</h1>
          <div className="text-sm text-gray-400">
            <span>{likedSongs.length} songs</span>
          </div>
        </div>
      </div>

      {/* Songs Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr className="border-b border-[#2a2a2a] text-left text-sm text-gray-400">
              <th className="pb-3 pl-4">#</th>
              <th className="pb-3">Title</th>
              <th className="pb-3 hidden md:table-cell">Album</th>
              <th className="pb-3 hidden lg:table-cell">Date added</th>
              <th className="pb-3 pr-8 text-center">
                <Clock className="inline-block w-4 h-4" />
              </th>
            </tr>
          </thead>
          <tbody>
            {likedSongs.map((song, index) => (
              <tr
                key={song._id}
                className="hover:bg-[#2a2a2a] group"
                onMouseEnter={() => setIsHovering(song._id)}
                onMouseLeave={() => setIsHovering(null)}
              >
                <td className="py-3 pl-4 w-10">
                  {isHovering === song._id ? (
                    <button onClick={() => handlePlayPause(song._id)} className="text-white">
                      {track?._id === song._id && playStatus ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </button>
                  ) : (
                    <span className={`${track?._id === song._id ? "text-green-500" : "text-gray-400"}`}>
                      {index + 1}
                    </span>
                  )}
                </td>
                <td className="py-3">
                  <div className="flex items-center">
                    <img src={song.image || "/placeholder.svg"} alt={song.name} className="w-10 h-10 mr-3" />
                    <div>
                      <p className={`font-medium ${track?._id === song._id ? "text-green-500" : "text-white"}`}>
                        {song.name}
                      </p>
                      <p className="text-sm text-gray-400">{song.desc || "Unknown Artist"}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 hidden md:table-cell text-gray-400">{song.album || "Single"}</td>
                <td className="py-3 hidden lg:table-cell text-gray-400">{song.dateAdded}</td>
                <td className="py-3 pr-8 text-right">
                  <div className="flex items-center justify-end">
                    <span className="text-gray-400 mr-4">{song.duration}</span>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {likedSongs.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <Heart className="w-16 h-16 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Songs you like will appear here</h2>
          <p>Save songs by tapping the heart icon</p>
        </div>
      )}
    </div>
  )
}

export default LikedSongsPage
