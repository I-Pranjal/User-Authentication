import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login({setUname}) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login successful!');
        setUname(name); 
        navigate('/home');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during login.');
    }
  };

  return (
    <div>
      <div className="bg-orange-200 p-10 gap-6 flex flex-col">
        <div className="flex flex-col gap-10">
          <h1 className="font-mono text-4xl">Login Page</h1>
          {/* Name Field */}
          <input
            placeholder="Enter name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {/* Password Field */}
          <input
            placeholder="Enter password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-400 hover:bg-green-700"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>

        <h3>Don't have an account?</h3>
        <Link to="/signup">Create account</Link>
      </div>
    </div>
  );
}
