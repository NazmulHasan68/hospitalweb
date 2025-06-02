import Consultation_Department_Symptom from '@/components/pages/consultation/Consultation_Department_Symptom '
import Consultation_Hero_search from '@/components/pages/consultation/Consultation_Hero_search'
import Consultation_speclist_section from '@/components/pages/consultation/Consultation_speclist_section'
import React from 'react'

export default function Consultation_page_user() {
  return (
    <div className='mt-24'>
      <Consultation_Hero_search/>
      <Consultation_speclist_section/>
      <Consultation_Department_Symptom/>
    </div>
  )
}
