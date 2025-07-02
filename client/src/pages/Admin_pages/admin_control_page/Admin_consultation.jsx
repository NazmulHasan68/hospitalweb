import { useGetAdminDashboardQuery } from '@/redux/ApiController/dashboardApi';
import React from 'react'

export default function Admin_consultation() {
    const { data, isLoading, error } = useGetAdminDashboardQuery();
    console.log(data);
    
  return (
    <div>
      Admin_consultation
    </div>
  )
}
