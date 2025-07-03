import React from 'react';
import { useGetSectionItemsQuery } from '@/redux/ApiController/bannerApi';
import AdminSectionSlider from './Admin_section_slider';

export default function Admin_add_banner() {
  const homeSection = useGetSectionItemsQuery('home-banner');
  const medicalPartners = useGetSectionItemsQuery('medical-partners');
  const mediaNews = useGetSectionItemsQuery('media-news');
  const aboutUsPhotos = useGetSectionItemsQuery('about-us-photos');
  const doctorBanner = useGetSectionItemsQuery('doctor-banner');
  const travelBanner = useGetSectionItemsQuery('travel-banner');
  const helpLine = useGetSectionItemsQuery('help-line');

  return (
    <div className="p-6 space-y-8 overflow-auto max-h-[80vh]">
      {/* Home Section */}
      {homeSection.isLoading ? (
        <p>Loading Home Section...</p>
      ) : homeSection.isError ? (
        <p>Error loading Home Section</p>
      ) : (
        <AdminSectionSlider
          sectionPath="home-banner"
          sectionTitle="Home Section"
          items={homeSection.data?.data || []}
        />
      )}

      {/* Medical Partners */}
      {medicalPartners.isLoading ? (
        <p>Loading Medical Partners...</p>
      ) : medicalPartners.isError ? (
        <p>Error loading Medical Partners</p>
      ) : (
        <AdminSectionSlider
          sectionPath="medical-partners"
          sectionTitle="Medical Partners"
          items={medicalPartners.data?.data || []}
        />
      )}

      {/* Media News */}
      {mediaNews.isLoading ? (
        <p>Loading Media News...</p>
      ) : mediaNews.isError ? (
        <p>Error loading Media News</p>
      ) : (
        <AdminSectionSlider
          sectionPath="media-news"
          sectionTitle="Media News"
          items={mediaNews.data?.data || []}
        />
      )}

      {/* About Us Photos */}
      {aboutUsPhotos.isLoading ? (
        <p>Loading About Us Photos...</p>
      ) : aboutUsPhotos.isError ? (
        <p>Error loading About Us Photos</p>
      ) : (
        <AdminSectionSlider
          sectionPath="about-us-photos"
          sectionTitle="About Us Photos"
          items={aboutUsPhotos.data?.data || []}
        />
      )}

      {/* Doctor Banner */}
      {doctorBanner.isLoading ? (
        <p>Loading Doctor Banner...</p>
      ) : doctorBanner.isError ? (
        <p>Error loading Doctor Banner</p>
      ) : (
        <AdminSectionSlider
          sectionPath="doctor-banner"
          sectionTitle="Doctor Banner"
          items={doctorBanner.data?.data || []}
        />
      )}

      {/* Travel Banner */}
      {travelBanner.isLoading ? (
        <p>Loading Travel Banner...</p>
      ) : travelBanner.isError ? (
        <p>Error loading Travel Banner</p>
      ) : (
        <AdminSectionSlider
          sectionPath="travel-banner"
          sectionTitle="Travel Banner"
          items={travelBanner.data?.data || []}
        />
      )}

      {/* Help Line */}
      {helpLine.isLoading ? (
        <p>Loading Help Line...</p>
      ) : helpLine.isError ? (
        <p>Error loading Help Line</p>
      ) : (
        <AdminSectionSlider
          sectionPath="help-line"
          sectionTitle="Help Line"
          items={helpLine.data?.data || []}
        />
      )}
    </div>
  );
}
