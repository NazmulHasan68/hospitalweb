import React from 'react'
import { Link } from 'react-router-dom'

export default function Doctor_Sidebar() {
  return (
     <main className='flex flex-col gap-2'>
      <Link to={"/doctor/pateint"}>See patient</Link>
      <Link to={"/doctor/pateint"}>Profile</Link>
      <Link to={"/doctor/pateint"}>admin</Link>
    </main>
  )
}
