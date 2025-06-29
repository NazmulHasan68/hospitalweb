import { NavLink, Outlet } from 'react-router-dom';

export default function Consultation_doctor_Name({data}) {
  console.log(data);
  
  return (
    <div className='max-w-6xl mx-2 md:mx-auto'>
      <div className='mt-4 ml-40 md:ml-64'>
        <h1 className='text-xl font-semibold'>Dr. {data?.name}</h1>
        <p className='text-xs'>{data?.specialization}</p>
      </div>
      
      {/* Nav tabs */}
      <div className='w-full bg-slate-700 flex gap-3 text-white pl-4 py-2 text-lg mt-10'>
        <NavLink
          to={'info'}
          className={({ isActive }) => isActive ? 'font-bold text-blue-300' : ''}
          state={data}
        >
          Info
        </NavLink>
        <NavLink
          to={'expriance'}
          className={({ isActive }) => isActive ? 'font-bold text-blue-300' : ''}
          state={data}
        >
          Experience
        </NavLink>
        <NavLink
          to={'education'}
          className={({ isActive }) => isActive ? 'font-bold text-blue-300' : ''}
          state={data}
        >
          Education
        </NavLink>
      </div>

      {/* Render child route */}
      <div>
        <Outlet />
      </div>
    </div>
  );
}

