import React from 'react'
import { Outlet } from 'react-router-dom'
import Admin_sidebar from './Admin_sidebar'

export default function AdminLayout() {
  return (
    <div className='mt-20 flex '>
        <div className=' basis-1/5 bg-red-500 p-4'>
            <Admin_sidebar/>
        </div>
        <div className='basis-4/5 bg-green-500 p-4'>
            <Outlet/>
        </div>
    </div>
  )
}
