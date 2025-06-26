import Contact_section from '@/components/Common/Contact_section'
import Travel_hospital_hero from '@/components/pages/TravelHospital/Travel_hospital_hero'
import Travel_hospital_info from '@/components/pages/TravelHospital/Travel_hospital_info'
import Travel_service_section from '@/components/pages/travelpage/Travel_serverice_section'
import React from 'react'

export default function Travel_Hospital() {
  return (
    <div className='mt-24'>
      <Travel_hospital_hero/>
      <Travel_hospital_info/>
      <Travel_service_section/>
      <Contact_section/>
     </div>
  )
}
