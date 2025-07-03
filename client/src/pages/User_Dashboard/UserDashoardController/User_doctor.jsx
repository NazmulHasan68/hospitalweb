import React from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'

export default function User_doctor() {
  return (
    <div className=''>
      <div className=' flex gap-2 md:gap-4 items-center mx-4'>
        <Link to={'/user_panel/doctor/token'} className="md:px-6 px-3 py-1 text-sm md:text-lg md:py-1 rounded-xl border text-blue-600 border-blue-500 hover:bg-blue-600 hover:text-white font-semibold">Token</Link>
        <Link to={'/user_panel/doctor/complete'} className="md:px-6 px-3 py-1 text-sm md:text-lg md:py-1 rounded-xl border text-blue-600 border-blue-500 hover:bg-blue-600 hover:text-white font-semibold">Complete</Link>
      </div>
      <div className='m-2'>
        <Outlet/>
      </div>
    </div>
  )
}
