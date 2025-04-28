"use client"

import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { url } from "../App"
import { toast } from 'react-toastify';

const SignupPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Animation states
  const [animateWave, setAnimateWave] = useState(false)

  useEffect(() => {
    // Start animation after component mounts
    setAnimateWave(true)
  }, [])

  const validateForm = () => {
    const newErrors = {}

    // Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid"
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 8 characters"
    }

    // Confirm password validation
    // Date of birth validation
    

    // Terms agreement validation
    
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsLoading(true)

      try {
        // Simulate API call
        const userData = new FormData();
        userData.append("firstName",formData.firstName);
        userData.append("lastName",formData.lastName);
        userData.append("email",formData.email);
        userData.append("password",formData.password);
        const response = await axios.post(`${url}/api/auth/register`, userData, {
                                headers: {
                                    'Content-Type': 'application/json'
                                }
        });

        // Success - navigate to home
        if (response.data.success) {
            toast.success("Album Added");
                        
        } else {
            toast.error("Something went wrong");
        }
        navigate("/login")
      } catch (error) {
        console.error("Error Registration:", error);
        toast.error("Error occurred");
      } finally {
        setIsLoading(false)
      }
    }
  }

  // Generate month options


  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#121212] flex flex-col items-center justify-center px-4 py-12">
      {/* Audio wave animation */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className={`flex justify-around items-end h-full ${animateWave ? "animate-wave" : ""}`}>
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-green-500 rounded-t-full"
                style={{
                  height: `${Math.random() * 60 + 10}%`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${Math.random() * 2 + 1}s`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Logo */}
      <div className="mb-8 flex items-center justify-center">
        <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-black"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white ml-3">Tunify</h1>
      </div>

      {/* Signup Form */}
      <div className="w-full max-w-md bg-[#181818] rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Create your account</h2>

          {errors.general && (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-500 px-4 py-3 rounded mb-4">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`block w-full px-4 py-3 bg-[#242424] border-none text-white rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none ${
                    errors.firstName ? "ring-1 ring-red-500" : ""
                  }`}
                  placeholder="John"
                />
                {errors.firstName && <p className="mt-2 text-sm text-red-500">{errors.firstName}</p>}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`block w-full px-4 py-3 bg-[#242424] border-none text-white rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none ${
                    errors.lastName ? "ring-1 ring-red-500" : ""
                  }`}
                  placeholder="Doe"
                />
                {errors.lastName && <p className="mt-2 text-sm text-red-500">{errors.lastName}</p>}
              </div>
            </div>

            {/* Email Input */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`block w-full px-4 py-3 bg-[#242424] border-none text-white rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none ${
                  errors.email ? "ring-1 ring-red-500" : ""
                }`}
                placeholder="name@example.com"
              />
              {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full px-4 py-3 bg-[#242424] border-none text-white rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none ${
                    errors.password ? "ring-1 ring-red-500" : ""
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                        clipRule="evenodd"
                      />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-2 text-sm text-red-500">{errors.password}</p>}
            </div>

            {/* Confirm Password Input */}
            

            {/* Date of Birth */}
           
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-black bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : null}
              {isLoading ? "Creating account..." : "Sign Up"}
            </button>
          </form>
        </div>

        {/* Login Section */}
        <div className="px-8 py-6 bg-[#121212] border-t border-gray-800">
          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-green-500 hover:text-green-400">
              Log in
            </Link>
          </p>
        </div>
      </div>

      {/* Add this to your CSS or in a style tag */}
      <style jsx>{`
        @keyframes wave {
          0%, 100% {
            height: 20%;
          }
          50% {
            height: 60%;
          }
        }
        .animate-wave div {
          animation: wave 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default SignupPage
