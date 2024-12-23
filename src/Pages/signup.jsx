import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup({ setUname }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    if (name.trim() === '' || password.trim() === '') {
      setError('Both fields are required');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    if (name.length > 30) {
      setError('Name cannot be more than 30 characters');
      return;
    }

    // If everything is OK
    setError('');

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Account created successfully!');
        setUname(name);
        navigate('/home');
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during signup.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-600 p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">Create Account</h1>

        {/* Name Field */}
        <div className="mb-4">
          <input
            placeholder="Enter name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password Field */}
        <div className="flex items-center mb-6">
          <input
            placeholder="Enter password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="ml-2 text-blue-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-700 text-white p-3 rounded-lg transition duration-300"
          onClick={handleSubmit}
        >
          Submit
        </button>

        {/* Error Message */}
        {error && (
          <p className="mt-4 text-red-600 text-center">{error}</p>
        )}

        {/* Redirect Link */}
        <div className="mt-6 text-center">
          <h3 className="text-lg text-gray-700">Already have an account?</h3>
          <Link to="/" className="text-blue-600 hover:underline">Login</Link>
        </div>
      </div>
    </div>
  );
}
