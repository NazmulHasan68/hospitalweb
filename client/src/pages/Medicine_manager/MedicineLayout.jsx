import React from 'react'
import Medicine_Sidebar from './Medicine_Sidebar'
import { Outlet } from 'react-router-dom'
import Mobile_Medicine_sidebar from './Mobile_Medicine_sidebar'

export default function MedicineLayout() {
  return (
   <div className='mt-20 flex flex-col gap-6 md:flex-row max-w-7xl md:mx-auto'>
        <div className=' basis-1/5 bg-blue-500 text-white font-medium'>
            <div className='hidden md:block'>
              <Medicine_Sidebar/>
            </div>
            <div className='md:hidden block'>
              <Mobile_Medicine_sidebar/>
            </div>
        </div>
        <div className='basis-4/5 pt-2 md:pt-8'>
            <Outlet/>
        </div>
    </div>
  )
}
