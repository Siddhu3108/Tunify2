import { useNavigate } from 'react-router-dom';

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 text-center">
          <h1 className="text-3xl font-bold text-white">Welcome to Tunify</h1>
          <p className="text-purple-100 mt-2">Your personal music companion</p>
        </div>

        {/* Auth Options */}
        <div className="p-8 space-y-4">
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="w-full border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-medium py-3 px-4 rounded-lg transition duration-200"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}