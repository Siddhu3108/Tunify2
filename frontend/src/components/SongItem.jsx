import React, { useContext, useState } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { Heart, Plus } from 'lucide-react';
import AddToPlaylistModal from './AddToPlaylist';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { url } from '../App';
import { toast } from 'react-toastify';

const SongItem = ({ name, image, desc, id }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { playWithId } = useContext(PlayerContext);
  const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);
  const [cookies] = useCookies(["token"]);

  const addSongToPlaylist = async (playlistId) => {
    try {
      let token = cookies.token;
      const formData = new FormData();
      formData.append("playlistId", playlistId);
      formData.append("songId", id);
      
      const response = await axios.post(`${url}/api/playlist/addSong`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.data._id) {
        toast.success("Song added to playlist!", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setAddToPlaylistModalOpen(false);
      }
    } catch (error) {
      toast.error("Failed to add song to playlist", {
        position: "bottom-center",
        autoClose: 2000,
      });
    }
  };

  const handleAddToPlaylist = (e) => {
    e.stopPropagation();
    setAddToPlaylistModalOpen(true);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    // Like song logic here
  };

  const handleCardClick = (e) => {
    // Only play if we didn't click on one of the buttons
    if (!e.target.closest('button')) {
      playWithId(id);
    }
  };

  return (
    <>
      {addToPlaylistModalOpen && (
        <AddToPlaylistModal
          closeModal={() => setAddToPlaylistModalOpen(false)}
          addSongToPlaylist={addSongToPlaylist}
        />
      )}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
        className='relative min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] group'
      >
        <div className='relative'>
          <img className='rounded w-full aspect-square object-cover' src={image} alt={name} />
          {isHovered && (
            <div className='absolute bottom-2 right-2 flex items-center gap-2'>
              <button
                onClick={handleAddToPlaylist}
                className='p-2 bg-black/60 backdrop-blur-sm rounded-full hover:bg-black/80 transition-all transform hover:scale-110'
                aria-label="Add to playlist"
              >
                <Plus className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={handleLike}
                className='p-2 bg-black/60 backdrop-blur-sm rounded-full hover:bg-black/80 transition-all transform hover:scale-110'
                aria-label="Like song"
              >
                <Heart className="w-4 h-4 text-white" />
              </button>
            </div>
          )}
        </div>
        <p className='font-bold mt-2 mb-1 truncate'>{name}</p>
        <p className='text-slate-200 text-sm line-clamp-2'>{desc}</p>
      </div>
    </>
  );
};

export default SongItem;