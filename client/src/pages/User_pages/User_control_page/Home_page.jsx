import Home_about_section from '@/components/pages/homepage/Home_about_section'
import Home_hero_section from '@/components/pages/homepage/Home_hero_section'
import Home_mass_media_section from '@/components/pages/homepage/Home_mass_media_section'
import Home_medi_destination from '@/components/pages/homepage/Home_medi_destination'
import Home_medical_partner from '@/components/pages/homepage/Home_medical_partner'
import Home_nevigation_section from '@/components/pages/homepage/Home_nevigation_section'
import Home_primium_section from '@/components/pages/homepage/Home_primium_section'
import Home_whyus_section from '@/components/pages/homepage/Home_whyus_section'
import React from 'react'

export default function Home_page() {

  return (
    <div className='mt-24 md:mt-24'>
      <Home_hero_section/>
      <Home_nevigation_section/>
      <Home_medi_destination/>
      <Home_whyus_section/>
      <Home_medical_partner/>
      <Home_primium_section/>
      <Home_mass_media_section/>
      <Home_about_section/>
    </div>
  )
}
