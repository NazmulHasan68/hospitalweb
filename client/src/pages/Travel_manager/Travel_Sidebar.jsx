import React from 'react'
import { Link } from 'react-router-dom'

export default function Travel_Sidebar() {
  return (
    <main className='flex flex-col gap-2'>
      <Link to={"/travel/dashboard"}>T. Dashboard</Link>
      <Link to={"/travel/dashboard"}>T. Dashboard</Link>
      <Link to={"/travel/dashboard"}>T. Dashboard</Link>
    </main>
  )
}
