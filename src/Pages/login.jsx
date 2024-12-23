import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login({setUname}) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error , setError] = useState(''); 
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); 

  const handleSubmit = async () => {

        // Error check 
        if (name.trim() === '' || password.trim() === ''){
          setError('Both fields are required'); 
          return  ;
        }

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
          <div 
          className='gap-10 flex'
          >
            
          <input
            placeholder="Enter password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          <button
          className='bg-blue-700 text-white p-2'
          onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
            </div>
          <button
            type="submit"
            className="bg-green-400 hover:bg-green-700"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>

          {error && 
          <p className='text-red-500'>
            {error}
          </p>
          }

        <h3>Don't have an account?</h3>
        <Link to="/signup">Create account</Link>
      </div>
    </div>
  );
}
