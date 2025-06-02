import React from 'react'
import { Outlet } from 'react-router-dom'
import UserSidebar from './UserSidebar'

export default function UserControllerLayout() {
  return (
    <div className='flex mt-20'>
        <div className=' basis-1/4'>
            <UserSidebar/>
        </div>
        <div className='basis-3/4'>
            <Outlet/>
        </div>
    </div>
  )
}
