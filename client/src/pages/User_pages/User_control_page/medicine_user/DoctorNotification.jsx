import { Stethoscope } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function DoctorNotification() {
  return (
   <Link to={'/user_panel/doctor/token'} className='p-5  bg-pink-500 hover:bg-pink-700 text-white rounded-full relative cursor-pointer'>
      <Stethoscope />
      <div className=' absolute -top-1 right-1 p-2 rounded-full text-white font-bold'></div>
    </Link>
  )
}
