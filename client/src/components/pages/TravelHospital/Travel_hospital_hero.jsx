import { useGetHospitalByIdQuery } from "@/redux/ApiController/Hospital";
import { useParams } from "react-router-dom";


export default function Travel_hospital_hero() {
const {id} = useParams()
  const {data} = useGetHospitalByIdQuery(id)
  const hospital = data
  console.log(hospital);
  
  return (
    <div className="max-w-7xl mx-auto mt-6">

          <div className="relative">
            <img
             src={`${import.meta.env.VITE_BASE_URL}/public/hospitals/${hospital?.banner}`}
              alt={hospital?.hospitalName}
              className="w-full h-[250px] md:h-[300px] object-cover rounded-xl shadow-lg"
            />
          
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 rounded-xl">
              <h2 className="text-white text-2xl md:text-4xl font-bold text-center px-4">
                {hospital?.hospitalName}
              </h2>
            </div>
          </div>
    </div>
  );
}
