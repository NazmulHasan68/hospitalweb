import React from 'react'
import Medicine_Sidebar from './Medicine_Sidebar'
import { Outlet } from 'react-router-dom'

export default function MedicineLayout() {
  return (
   <div className='mt-20 flex '>
        <div className=' basis-1/5 bg-red-500 p-4'>
            <Medicine_Sidebar/>
        </div>
        <div className='basis-4/5 bg-green-500 p-4'>
            <Outlet/>
        </div>
    </div>
  )
}
