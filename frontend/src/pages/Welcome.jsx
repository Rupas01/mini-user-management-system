import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
      <div className="text-center space-y-6 max-w-2xl px-6">
        {/* Hero Text */}
        <h1 className="text-5xl font-extrabold tracking-tight">
          User Management System
        </h1>
        <p className="text-xl text-blue-100">
          A secure, modern full-stack application for managing users and profiles efficiently.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            to="/login"
            className="px-8 py-3 bg-white text-blue-600 font-bold rounded-full shadow-lg hover:bg-gray-100 transition transform hover:-translate-y-1"
          >
            Log In
          </Link>
          
          <Link
            to="/register"
            className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition transform hover:-translate-y-1"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;