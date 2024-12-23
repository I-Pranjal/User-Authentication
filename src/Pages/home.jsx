import React from 'react'

export default function Home({Uname}) {
  return (
    <div className='text-blue-500 bg-pink-300'>
      <h1 className='text-9xl'>
        Welcome 
      </h1>
      <h2 className='text-5xl font-extralight'>
        {Uname}
      </h2>
    </div>
  )
}
