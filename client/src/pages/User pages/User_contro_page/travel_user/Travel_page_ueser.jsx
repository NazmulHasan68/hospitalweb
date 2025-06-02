import Contact_section from '@/components/Common/Contact_section'
import Travel_guidline from '@/components/pages/travelpage/Travel_guidline'
import Travel_Hero_section from '@/components/pages/travelpage/Travel_Hero_section'
import Travel_search_hospital from '@/components/pages/travelpage/Travel_search_hospital'
import Travel_service_section from '@/components/pages/travelpage/Travel_serverice_section'
import React from 'react'

export default function Travel_page_ueser() {
  return (
    <div className='mt-24'>
      <Travel_Hero_section/>
      <Travel_search_hospital/>
      <Travel_guidline/>
      <Travel_service_section/>
      <Contact_section/>
    </div>
  )
}
