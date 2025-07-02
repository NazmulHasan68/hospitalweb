import { useLoadUserQuery } from '@/redux/ApiController/authApi';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

export default function Consultation_doctor_Name({data}) {
  const navigate = useNavigate()
  const {data:user} = useLoadUserQuery()

    const handleAppointment = ()=>{
        if(!user.user){
          alert("First Login then Back here ")
          navigate('/')
        }else{

          navigate(`/user_consultation/Appointment/doctor/${data._id}/patient/${user.user._id}`);
        }
    }
  
  return (
    <div className='max-w-6xl mx-2 md:mx-auto'>
      <div className='mt-2 ml-40 md:ml-64'>
        <h1 className='text-xl font-semibold'>Dr. {data?.name}</h1>
        <p className='text-xs'>{data?.specialization}</p>
      </div>


      <div className='md:my-12 max-w-sm mx-auto my-8 flex justify-between items-center border-t-2 p-2'>
        <p>Fess : <strong>{data?.fees}Tk</strong></p>
        <button onClick={handleAppointment} className='bg-sky-600 hover:bg-sky-500 font-bold px-6 text-emerald-50 py-2 rounded-3xl'>Appointment</button>
      </div>

      
      {/* Nav tabs */}
      <div className='w-full bg-slate-700 flex gap-3 text-white pl-4 py-2 text-lg mt-4'>
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

