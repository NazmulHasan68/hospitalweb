import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Admin_sidebar() {
  return (
    <main className='flex flex-col gap-2'>
      <Link to={"/admin/dashboard"}>Dashboard</Link>
      <Link to={"/admin/dashboard"}>Dashboard</Link>
      <Link to={"/admin/dashboard"}>Dashboard</Link>
    </main>
  )
}
