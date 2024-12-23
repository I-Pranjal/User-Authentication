import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [Uname, setUname] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    if (token) {
      try {
        // Decode the JWT token to extract user details
        const decodedToken = jwtDecode(token);

        // Check if the token is expired
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          console.warn('Token has expired.');
          localStorage.removeItem('token');
          setUname('');
          return;
        }

        setUname(decodedToken.name);
      } catch (err) {
        console.error('Error decoding token:', err);
      }
    } else {
      console.warn('No token found. Redirect to login or handle appropriately.');
      navigate('/');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-pink-500 to-purple-500 p-8">
      <div className="bg-white rounded-lg shadow-xl p-10 max-w-xl w-full text-center">
        <h1 className="text-6xl font-semibold text-gray-900 mb-4">Welcome</h1>
        <h2 className="text-3xl font-light text-gray-600 mb-8">
          {Uname ? `Hello, ${Uname}` : 'Hello, Guest'}
        </h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-800 text-white font-bold py-3 px-8 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
