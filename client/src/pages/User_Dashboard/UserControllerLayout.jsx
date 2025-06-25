import React from 'react'
import { Outlet } from 'react-router-dom'
import UserSidebar from './UserSidebar'
import Mobile_user_sidebar from './Mobile_user_sidebar'

export default function UserControllerLayout() {
  return (
     <div className='mt-20 flex flex-col gap-6 md:flex-row max-w-7xl md:mx-auto'>
            <div className=' basis-1/5 bg-blue-500 text-white font-medium'>
                <div className='hidden md:block'>
                   <UserSidebar/>
                </div>
                <div className='md:hidden flex mt-4'>
                  <Mobile_user_sidebar/>
                </div>
            </div>
            <div className='basis-4/5 pt-2 md:pt-8'>
                <Outlet/>
            </div>
        </div>
  )
}