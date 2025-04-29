"use client"

import axios from 'axios';
import React from "react"
import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { url } from "../App"
import { toast } from 'react-toastify';
import { useCookies } from "react-cookie";
import { X } from "lucide-react";



const CreatePlaylistPage = () => {
  const navigate = useNavigate()
  const [cookies] = useCookies(["token"]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  })
  const [coverImage, setCoverImage] = useState(null)
  const [coverImagePreview, setCoverImagePreview] = useState(null)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef(null)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Playlist name is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setCoverImage(file)

      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setCoverImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current.click()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsLoading(true)

      try {
        console.log(cookies)
        let token=cookies.token;

        // const playlistData = {
        //   name: formData.name,
        //   description: formData.description,
        //   image: coverImagePreview,   // Just a Base64 preview for now
        //   songs: [], // empty songs array
        // };
        // const playlistData = new FormData();
        // playlistData.append('name', formData.name);
        // playlistData.append('desc', formData.desc);
        // const imageUpload = await cloudinary.uploader.upload(formData.image.path, { resource_type: "image" });
        // playlistData.append('image', formData.image);
        // Simulate API call
        // const response = await axios.post(`${url}/api/playlist/create`, playlistData, {
        //         headers: {
        //             'Content-Type': 'application/json',
        //             Authorization: `Bearer ${token}`,

        //         }
        //     });
        const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('desc', formData.description);
      formDataToSend.append('image', coverImage); // 🛠️ Important: send actual File object
      formDataToSend.append('songs', JSON.stringify([])); // songs array

      const response = await axios.post(`${url}/api/playlist/create`, formDataToSend, {
        headers: {
          // 'Content-Type': 'multipart/form-data', // 🛠️ Important
          Authorization: `Bearer ${token}`,
        },
      });
        // In a real application, you would upload the image and create the playlist
        console.log("Creating playlist:", {
          ...formData,
          coverImage: coverImage ? coverImage.name : "default-cover.jpg",
        })

        if (response.data.success) {
                toast.success("Album Added");
                // setDesc("");
                // setName("");
                // setImage(null);
            } else {
                toast.error("Something went wrong");
            }

        // Success - navigate to the new playlist (for now, just go to home)
        navigate("/home")
      } catch (error) {
        console.error("Error creating Playlist :", error);
            toast.error("Error occurred");
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#121212] to-black flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#181818] rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Create New Playlist</h2>

          {errors.general && (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-500 px-4 py-3 rounded mb-4">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Cover Image Upload */}
            <div className="mb-6 flex flex-col items-center">
              <div
                onClick={triggerFileInput}
                className="w-48 h-48 bg-[#282828] rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-[#333333] transition-colors mb-2 overflow-hidden"
              >
                {coverImagePreview ? (
                  <img
                    src={coverImagePreview || "/placeholder.svg"}
                    alt="Cover Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-gray-400 mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <p className="text-sm text-gray-400">Choose image</p>
                  </>
                )}
              </div>
              <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
              <p className="text-xs text-gray-400">Recommended: 300 x 300 pixels</p>
            </div>

            {/* Playlist Name */}
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`block w-full px-4 py-3 bg-[#242424] border-none text-white rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none ${
                  errors.name ? "ring-1 ring-red-500" : ""
                }`}
                placeholder="My Awesome Playlist"
              />
              {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name}</p>}
            </div>

            {/* Description */}
            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="block w-full px-4 py-3 bg-[#242424] border-none text-white rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none resize-none"
                placeholder="Add an optional description"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="px-4 py-2 border border-gray-600 rounded-full text-white hover:bg-[#282828] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-6 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-black bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating...
                  </div>
                ) : (
                  "Create Playlist"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePlaylistPage
