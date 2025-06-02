import React from 'react';
import { Outlet } from 'react-router-dom';
import Medicine_user_Sidebar from './Medicine_user_Sidebar';
import Medicine_search_bar from './Medicine_search_bar';

export default function Medicine_user_Layout() {
  return (
    <div className="mt-24 px-4 py-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">

        <div className="w-full md:w-1/4">
          <Medicine_user_Sidebar />
        </div>
        
        <div className="w-full md:w-3/4 space-y-4 md:mt-0 -mt-6">
          <Medicine_search_bar/>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
