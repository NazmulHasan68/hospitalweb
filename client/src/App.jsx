import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import MainLayoutpage from "./pages/MainLayoutpages";
import AuthLayout from "./pages/Auth_pages/AuthLayout";
import Login from "./pages/Auth_pages/Login";
import Signup from "./pages/Auth_pages/Signup";
import VerifyCode from "./pages/Auth_pages/VerifyCode";
import ForgotPassword from "./pages/Auth_pages/ForgotPassword";
import ForgotPasswordCode from "./pages/Auth_pages/ForgotPasswordCode";
import ResetPassword from "./pages/Auth_pages/ResetPassword";
import AdminLayout from "./pages/Admin_pages/AdminLayout";
import Admin_Dashboard from "./pages/Admin_pages/admin_control_page/Admin_Dashboard";
import DoctorLayout from "./pages/Doctor_pages/DoctorLayout";
import Doctor_patient from "./pages/Doctor_pages/doctor_control_page/Doctor_patient";
import MedicineLayout from "./pages/Medicine_manager/MedicineLayout";
import Medicine_Dashboard from "./pages/Medicine_manager/medicine_control_page/Medicine_Dashboard";
import TravelLayout from "./pages/Travel_manager/TravelLayout";
import Travel_Dashboard from "./pages/Travel_manager/Travel_control_page/Travel_Dashboard";
import ConsultationLayout from "./pages/Consultaion_manager/ConsultationLayout";
import Consultation_Dashboard from "./pages/Consultaion_manager/consultation_control_page/Consultation_Dashboard";
import UserLayoutpage from "./pages/User_pages/UserLayoutpage";
import Home_page from "./pages/User_pages/User_control_page/Home_page";
import Travel_page_ueser from "./pages/User_pages/User_control_page/travel_user/Travel_page_ueser";
import Medicine_Page_user from "./pages/User_pages/User_control_page/medicine_user/Medicine_Page_user";
import Consultation_user_Layout from "./pages/User_pages/User_control_page/consultation_user/Consultation_user_Layout";
import Medicine_user_Layout from "./pages/User_pages/User_control_page/medicine_user/Medicine_user_Layout";
import Consultation_page_user from "./pages/User_pages/User_control_page/consultation_user/Consultation_page_user";
import Travel_user_layout from "./pages/User_pages/User_control_page/travel_user/Travel_user_layout";
import Medicine_product_details from "./pages/User_pages/User_control_page/medicine_user/Medicine_product_details";
import Travel_Hospital from "./pages/User_pages/User_control_page/travel_user/Travel_Hospital";
import Consultation_doctor_search from "./pages/User_pages/User_control_page/consultation_user/Consultation_doctor_search";
import UserControllerLayout from "./pages/User_Dashboard/UserControllerLayout";
import UserCost from "./pages/User_Dashboard/UserDashoardController/UserCost";
import HelpLine from "./components/Common/HelpLine";
import Consultation_doctor_details from "./pages/User_pages/User_control_page/consultation_user/Consultation_doctor_details";
import Consultation_doctor_info from "./pages/User_pages/User_control_page/consultation_user/Consultation_doctor_info";
import Consultation_doctor_expariance from "./pages/User_pages/User_control_page/consultation_user/Consultation_doctor_expariance";
import Consultation_doctor_education from "./pages/User_pages/User_control_page/consultation_user/Consultation_doctor_education";
import Consultation_video from "./pages/User_pages/User_control_page/consultation_user/Consultation_video";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayoutpage/>,
    children: [
      { 
        path: "auth", element:<AuthLayout/> ,  
        children : [
            { path: "login", element: <Login /> }, 
            { path: "signup", element: <Signup /> },
            { path: "verify-code", element:<VerifyCode/>},
            { path: "forgot-password", element:<ForgotPassword/>},
            { path: "verify-forgot-verify-code", element:<ForgotPasswordCode/>},
            { path: "reset-password", element:<ResetPassword/>}
        ]
      },

      {
        path : "", element : <UserLayoutpage/>,
        children : [
            { path : "", element : <Home_page/>},
            { path : "/helpline", element:<HelpLine/>},
            { path : "/user_travel", element :<Travel_user_layout/> ,
              children : [
                { path : "", element : <Travel_page_ueser/>},
                { path : "hospital", element : <Travel_Hospital/>}
              ]
            },
            { path : "/user_medicine", element : <Medicine_user_Layout/> ,
              children : [
                { path : "", element : <Medicine_Page_user/>},
                { path : "product_detaiils", element : <Medicine_product_details/>}
              ]
            },
            { path : "/user_consultation", element : <Consultation_user_Layout/>,
              children : [
                { path : "", element : <Consultation_page_user/>},
                { path : "video", element : <Consultation_video/>},
                { path : "search", element : <Consultation_doctor_search/>},
                { path : "doctor", element : <Consultation_doctor_details/>,
                  children : [
                    { path : "info" , element : <Consultation_doctor_info/>},
                    { path : "expriance" , element : <Consultation_doctor_expariance/>},
                    { path : "education" , element : <Consultation_doctor_education/>},
                  ]
                }
              ]
            },
        ]
      },

      {// ============================================ ========= this section is only for controler section
        path : "user_panel", element : <UserControllerLayout/>,
        children : [
          { path : "cost", element : <UserCost/> }
        ]
      },
      { // ============================================ ========= this section is only for admin section 
        path : "admin" , element : <AdminLayout/>,
        children : [
          { path : "dashboard", element : <Admin_Dashboard/>}
        ]
      },
      {// ============================================ =========== this section is only for doctor 
        path : "doctor" , element : <DoctorLayout/>,
        children : [
          { path : "pateint", element : <Doctor_patient/>}
        ]
      },

      {// ============================================ =========== this section is only for travel 
        path : "travel" , element : <TravelLayout/>,
        children : [
          { path : "dashboard", element : <Travel_Dashboard/>}
        ]
      },

      {// ============================================ =========== this section is only for medicine 
        path : "medicine" , element : <MedicineLayout/>,
        children : [
          { path : "dashboard", element : <Medicine_Dashboard/>}
        ]
      },

      {// ============================================ =========== this section is only for consultation 
        path : "consultation" , element : <ConsultationLayout/>,
        children : [
          { path : "dashboard", element : <Consultation_Dashboard/>}
        ]
      },
    ]
  }
]);

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
