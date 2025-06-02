import Consultation_doctor_Hero_section from '@/components/pages/ConsultationSearchPage/Consultation_doctor_Hero_section'
import Consultation_doctor_Name from '@/components/pages/ConsultationSearchPage/Consultation_doctor_Name'
import React from 'react'

export default function Consultation_doctor_details() {
  return (
    <div className=' mt-20 md:mt-24 py-4'>
      <Consultation_doctor_Hero_section/>
      <Consultation_doctor_Name/>
    </div>
  )
}
