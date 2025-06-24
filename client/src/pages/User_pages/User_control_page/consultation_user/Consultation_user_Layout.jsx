import React from 'react'
import { Outlet } from 'react-router-dom'
import Fixed_cart from '../medicine_user/Fixed_cart'
import DoctorNotification from '../medicine_user/DoctorNotification'

export default function Consultation_user_Layout() {
  return (
    <div className=' relative'>
      <Outlet/>
      <div className='flex flex-col gap-2 fixed right-8 md:bottom-6 bottom-12'>
          <Fixed_cart/>
          <DoctorNotification/>
      </div>
    </div>
  )
}
