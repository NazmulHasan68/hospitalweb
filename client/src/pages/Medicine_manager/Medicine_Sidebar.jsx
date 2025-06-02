import React from 'react'
import { Link } from 'react-router-dom'

export default function Medicine_Sidebar() {
  return (
    <main className='flex flex-col gap-2 mt-20'>
      <Link to={"/medicine/dashboard"}>Dashboard</Link>
      <Link to={"/medicine/dashboard"}>Dashboard</Link>
      <Link to={"/medicine/dashboard"}>Dashboard</Link>
    </main>
  )
}
