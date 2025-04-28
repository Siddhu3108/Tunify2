import { useState, useEffect } from "react";
import { url } from "../App";
import axios from "axios";
import { useCookies } from "react-cookie";

const AddToPlaylistModal = ({ closeModal, addSongToPlaylist }) => {
    const [myPlaylists, setMyPlaylists] = useState([]);
    const [cookies] = useCookies(["token"]);
    
    useEffect(() => {
        const getData = async () => {
            let token = cookies.token;
            const response = await axios.get(`${url}/api/playlist/myplaylists`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMyPlaylists(response.data.data);
        };
        getData();
    }, []);

    return (
        <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={closeModal}
        >
            <div
                className="bg-zinc-900 w-full max-w-md rounded-xl shadow-xl p-6"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className="text-white mb-6 text-xl font-bold">
                    Select Playlist
                </div>
                <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-neutral-600 scrollbar-track-neutral-800">
                    {myPlaylists.length === 0 ? (
                        <div className="text-neutral-400 text-center py-4">
                            No playlists found
                        </div>
                    ) : (
                        myPlaylists.map((item) => (
                            <PlaylistListComponent
                                key={item._id}
                                info={item}
                                addSongToPlaylist={addSongToPlaylist}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

const PlaylistListComponent = ({ info, addSongToPlaylist }) => {
    return (
        <div 
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            onClick={() => addSongToPlaylist(info._id)}
        >
            <div className="flex-shrink-0">
                <img
                    src={info.image || 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
                    className="w-12 h-12 rounded-md object-cover"
                    alt={info.name}
                />
            </div>
            <div className="flex-grow min-w-0">
                <div className="text-white font-semibold text-sm truncate">
                    {info.name}
                </div>
                <div className="text-neutral-400 text-xs">
                    {info.songs?.length || 0} songs
                </div>
            </div>
        </div>
    );
};

export default AddToPlaylistModal;