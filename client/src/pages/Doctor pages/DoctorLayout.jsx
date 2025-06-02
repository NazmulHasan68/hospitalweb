import React from 'react'
import { Outlet } from 'react-router-dom'
import Doctor_Sidebar from './Doctor_Sidebar'

export default function DoctorLayout() {
  return (
    <div className='mt-20 flex '>
        <div className=' basis-1/5 bg-red-500 p-4'>
            <Doctor_Sidebar/>
        </div>
        <div className='basis-4/5 bg-green-500 p-4'>
            <Outlet/>
        </div>
    </div>
  )
}
