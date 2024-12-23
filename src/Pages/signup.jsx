import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup({setUname}) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error , setError] = useState(false); 
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {

    if (name.trim() === '' || password.trim() === ''){
      setError('Both fields are required'); 
      return  ;
    }
    if(password.length < 8){
      setError('Password must be at least 8 character long');
      return ;
    }
    if(name.length > 30){
      setError("Name cannot be more than 30 characters");  
      return ;
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
    <div>
      <div className="bg-orange-200 p-10 gap-6 flex flex-col">
        <div className="flex flex-col gap-10">
          <h1 className="font-mono text-4xl">Create Account</h1>
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
            className="bg-green-400 hover:bg-green-700 p-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        
          {/* Error is shown here  */}
          {error && 
          <p className='text-red-600 '>
            {error}
          </p>
          }

        <h3>Already have an account?</h3>
        <Link to="/">Login</Link>
      </div>
    </div>
  );
}
