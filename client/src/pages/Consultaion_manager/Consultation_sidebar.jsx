import React from 'react'
import { Link } from 'react-router-dom'

export default function Consultation_sidebar() {
  return (
    <main className='flex flex-col gap-2'>
      <Link to={"/consultation/dashboard"}>C. Dashboard</Link>
      <Link to={"/consultation/dashboard"}>C. Dashboard</Link>
      <Link to={"/consultation/dashboard"}>C. Dashboard</Link>
    </main>
  )
}
