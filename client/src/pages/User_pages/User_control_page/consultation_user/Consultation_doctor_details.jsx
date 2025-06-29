import Consultation_doctor_Hero_section from '@/components/pages/ConsultationSearchPage/Consultation_doctor_Hero_section'
import Consultation_doctor_Name from '@/components/pages/ConsultationSearchPage/Consultation_doctor_Name'
import { useGetConsultationByIdQuery } from '@/redux/ApiController/consaltaionAPi'
import React from 'react'
import { useParams } from 'react-router-dom'

export default function Consultation_doctor_details() {
  const {id} = useParams()
  const {data} = useGetConsultationByIdQuery(id)
  return (
    <div className=' mt-20 md:mt-24 py-4'>
      <Consultation_doctor_Hero_section data={data}/>
      <Consultation_doctor_Name data={data}/>
    </div>
  )
}
