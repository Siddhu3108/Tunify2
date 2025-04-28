"use client"

import { useContext, useState } from 'react'
import SideBar from './components/SideBar/'
import Player from './components/Player'
import Display from './components/Display'
import { PlayerContext } from './context/PlayerContext'
import { useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import LoginPage from "./components/LoginPage"
import SignupPage from "./components/SignupPage"
import { UserProvider } from './context/User'
export const url='http://localhost:4000'
import { CookiesProvider } from 'react-cookie';


const App = () => {
  const location = useLocation()
  const { audioRef, track, songsData } = useContext(PlayerContext);
  const isAuthPage = location.pathname.includes("login") || location.pathname.includes("signup")

  // If we're on an auth page, directly render the auth component
  if (isAuthPage) {
    return (
      <CookiesProvider>
      <UserProvider>
      <div className="h-screen w-screen bg-gradient-to-b from-black to-[#121212]">
        {location.pathname.includes("login") ? <LoginPage /> : <SignupPage />}
      </div>
      </UserProvider>
      </CookiesProvider>
    )
  }

  

  return (
    <>
    <CookiesProvider>
    <UserProvider>
      <div className='h-screen bg-black'>
        {
          songsData.lenght !== 0
            ? <>
              <div className='h-[90%] flex'>
                <SideBar />
                <Display />
              </div>
              <Player />
            </>
            : null
        }

        <audio ref={audioRef} src={track?track.file:" "} preload='auto'></audio>
      </div>
      </UserProvider>
      </CookiesProvider>
    </>
  )
}


export default App