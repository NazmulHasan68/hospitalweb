import ConsultationSearchResult from '@/components/pages/ConsultationSearchPage/consultation_search_result'
import Consultation_Search_Sidebar from '@/components/pages/ConsultationSearchPage/Consultation_Search_Sidebar'
import React from 'react'

export default function Consultation_doctor_search() {
  return (
   <div className='mt-24 flex gap-2 max-w-6xl md:mx-auto mx-4'>
      <div className='hiddden  md:basis-1/4'>
        <Consultation_Search_Sidebar/>
      </div>
      <div className=' md:basis-3/4'>
        <ConsultationSearchResult/>
      </div>
   </div>
  )
}
