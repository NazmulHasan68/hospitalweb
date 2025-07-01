import { Navigate, RouterProvider } from "react-router";
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
import HelpLine from "./components/Common/HelpLine";
import Consultation_doctor_details from "./pages/User_pages/User_control_page/consultation_user/Consultation_doctor_details";
import Consultation_doctor_info from "./pages/User_pages/User_control_page/consultation_user/Consultation_doctor_info";
import Consultation_doctor_expariance from "./pages/User_pages/User_control_page/consultation_user/Consultation_doctor_expariance";
import Consultation_doctor_education from "./pages/User_pages/User_control_page/consultation_user/Consultation_doctor_education";
import ProductList from "./pages/Medicine_manager/medicine_control_page/ProductList";
import ClientList from "./pages/Medicine_manager/medicine_control_page/ClientList";
import CheckOrders from "./pages/Medicine_manager/medicine_control_page/CheckOrders";
import ProcessingOrders from "./pages/Medicine_manager/medicine_control_page/ProcessingOrders";
import CompleteOrders from "./pages/Medicine_manager/medicine_control_page/CompleteOrders";
import RejectedOrders from "./pages/Medicine_manager/medicine_control_page/RejectedOrders";
import StaffPanel from "./pages/Medicine_manager/medicine_control_page/StaffPanel";
import SupportList from "./pages/Medicine_manager/medicine_control_page/SupportList";
import Profile from "./pages/Medicine_manager/medicine_control_page/Profile";
import Travel_hospital_list from "./pages/Travel_manager/Travel_control_page/Travel_hospital_list";
import Travel_Patient_list from "./pages/Travel_manager/Travel_control_page/Travel_Patient_list";
import Travel_new_appointment from "./pages/Travel_manager/Travel_control_page/Travel_new_appointment";
import Travel_processing from "./pages/Travel_manager/Travel_control_page/Travel_processing";
import Travel_complete_processing from "./pages/Travel_manager/Travel_control_page/Travel_complete_processing";
import Travel_rejected from "./pages/Travel_manager/Travel_control_page/Travel_rejected";
import Travel_support_list from "./pages/Travel_manager/Travel_control_page/Travel_support_list";
import Travel_profile from "./pages/Travel_manager/Travel_control_page/Travel_profile";
import Consultation_doctor_list from "./pages/Consultaion_manager/consultation_control_page/Consultation_doctor_list";
import Consultation_spespalist from "./pages/Consultaion_manager/consultation_control_page/Consultation_spespalist";
import Consultation_appointments from "./pages/Consultaion_manager/consultation_control_page/Consultation_appointments";
import Consultation_shedule from "./pages/Consultaion_manager/consultation_control_page/Consultation_shedule";
import Consultation_Complete from "./pages/Consultaion_manager/consultation_control_page/Consultation_Complete";
import Consultation_Rejected from "./pages/Consultaion_manager/consultation_control_page/Consultation_Rejected";
import Consultation_support_list from "./pages/Consultaion_manager/consultation_control_page/Consultation_support_list";
import Admin_patient_list from "./pages/Admin_pages/admin_control_page/Admin_Patient_list";
import Admin_doctor_list from "./pages/Admin_pages/admin_control_page/Admin_doctor_list";
import Admin_employee_list from "./pages/Admin_pages/admin_control_page/Admin_employee_list";
import Admin_hospital_list from "./pages/Admin_pages/admin_control_page/Admin_hospital_list";
import Admin_country_hospital_list from "./pages/Admin_pages/admin_control_page/Admin_country_hospital_list";
import Admin_medicine from "./pages/Admin_pages/admin_control_page/Admin_medicine";
import Admin_travel from "./pages/Admin_pages/admin_control_page/Admin_travel";
import Admin_consultation from "./pages/Admin_pages/admin_control_page/Admin_consultation";
import Admin_add_banner from "./pages/Admin_pages/admin_control_page/Admin_add_banner";
import Admin_profites from "./pages/Admin_pages/admin_control_page/Admin_profites";
import Doctor_deashboard from "./pages/Doctor_pages/doctor_control_page/Doctor_deashboard";
import Doctor_new_patient from "./pages/Doctor_pages/doctor_control_page/Doctor_new_patient";
import Doctor_return_patient from "./pages/Doctor_pages/doctor_control_page/Doctor_return_patient";
import Doctor_member_patient from "./pages/Doctor_pages/doctor_control_page/Doctor_member_patient";
import Doctor_shedule_patient from "./pages/Doctor_pages/doctor_control_page/Doctor_shedule_patient";
import Doctor_active_patient from "./pages/Doctor_pages/doctor_control_page/Doctor_active_patient";
import Doctor_complte_treatment from "./pages/Doctor_pages/doctor_control_page/Doctor_complte_treatment";
import Doctor_reject_treatment from "./pages/Doctor_pages/doctor_control_page/Doctor_reject_treatment";
import Doctor_support_list from "./pages/Doctor_pages/doctor_control_page/Doctor_support_list";
import User_dasboard from "./pages/User_Dashboard/UserDashoardController/User_dasboard";
import User_medicine from "./pages/User_Dashboard/UserDashoardController/User_medicine";
import User_travel from "./pages/User_Dashboard/UserDashoardController/User_travel";
import User_doctor from "./pages/User_Dashboard/UserDashoardController/User_doctor";
import User_order from "./pages/User_Dashboard/UserDashoardController/User_order";
import User_peronal from "./pages/User_Dashboard/UserDashoardController/User_peronal";
import StaffDetails from "./pages/Medicine_manager/medicine_control_page/StaffDetails";
import Complete_order from "./pages/User_Dashboard/UserDashoardController/Complete_order";
import Medicine_payment_success from "./components/Common/staff/payentFolder/Medicine_payment_success";
import Medicine_payment_failed from "./components/Common/staff/payentFolder/Medicine_payment_failed";
import Medicine_payment_cancel from "./components/Common/staff/payentFolder/Medicine_payment_cancel";
import ViewPrescription from "./pages/Medicine_manager/medicine_control_page/ViewPrescription";
import CheckClientDetails from "./pages/Medicine_manager/medicine_control_page/CheckClientDetails";
import Travel_hospital_view from "./pages/Travel_manager/Travel_control_page/Travel_hospital_view";
import Travel_apply from "./components/pages/TravelHospital/Travel_apply";
import View_order from "./pages/Travel_manager/Travel_control_page/View_order";
import Travel_User_order from "./pages/Travel_manager/Travel_control_page/Travel_User_order";
import Consultation_view_doctor from "./pages/Consultaion_manager/consultation_control_page/consultation_view_doctor";
import Consultaion_doctor_appoinment from "./components/pages/ConsultationSearchPage/Consultaion_doctor_appoinment";
import User_doctor_token from "./pages/User_Dashboard/UserDashoardController/User_doctor_token";
import User_doctor_checkup_complete from "./pages/User_Dashboard/UserDashoardController/User_doctor_checkup_complete";
import User_doctor_hostory from "./pages/User_Dashboard/UserDashoardController/User_doctor_hostory";
import Consultation_user_to_doctor from "./pages/Consultaion_manager/consultation_control_page/Consultation_user_to_doctor";



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
                { path : "hospital/:id", element : <Travel_Hospital/>},
                { path : "hospital/apply", element : <Travel_apply/>}
              ]
            },

            { path : "/user_medicine", element : <Medicine_user_Layout/> ,
              children : [
                { path : "", element : <Medicine_Page_user/>},
                { path : "product_details/:id", element : <Medicine_product_details/>}
              ]
            },
            
            { path : "/user_consultation", element : <Consultation_user_Layout/>,
              children : [
                { path : "", element : <Consultation_page_user/>},
                { path : "search", element : <Consultation_doctor_search/>},
                { path : "Appointment/doctor/:doctorId/patient/:patientId", element : <Consultaion_doctor_appoinment/>},
                { path : "doctor/:id", element: <Consultation_doctor_details />,
                  children: [
                    { index: true, element: <Navigate to="info" replace /> }, 
                    { path: "info", element: <Consultation_doctor_info /> },
                    { path: "expriance", element: <Consultation_doctor_expariance /> },
                    { path: "education", element: <Consultation_doctor_education /> },
                  ],
                },
              ]
            },
            { path: 'staff/:staffId', element: <StaffDetails /> } // stafffff
        ]
      },

      {// ============================================ ========= this section is only for controler section
        path : "user_panel", element : <UserControllerLayout/>,
        children : [
          { path : "dashboard", element : <User_dasboard/> },
          { path : "medicine", element : <User_medicine/> },
          { path : "travel", element : <User_travel/> },
          { path : "doctor", element : <User_doctor/>,
            children : [
              { path : "token", element:<User_doctor_token/>},
              { path : "complete", element:<User_doctor_checkup_complete/>},
              { path : "history", element:<User_doctor_hostory/>},
            ]
           },
          { path : "order", element : <User_order/> },
          { path : "complete", element : <Complete_order/> },
          { path : "personal", element : <User_peronal/> },
        ]
      },

      //================================== medicine payemnt status ==================================
      { path : `/medicine/payment-success/:userId`, element : <Medicine_payment_success/>},
      { path : `/medicine/payment-failed/:userId`, element : <Medicine_payment_failed/>},
      { path : `/medicine/payment-cancel/:userId`, element : <Medicine_payment_cancel/>},

      //================================== travel payemnt status ==================================
      { path : `/travel/payment-success/:userId`, element : <Doctor_deashboard/>},
      { path : `/travel/payment-failed/:userId`, element : <Doctor_deashboard/>},
      { path : `/travel/payment-cancel/:userId`, element : <Doctor_deashboard/>},

      //================================== doctor payemnt status ==================================
      { path : `/doctor/payment-success/:userId`, element : <Doctor_deashboard/>},
      { path : `/doctor/payment-failed/:userId`, element : <Doctor_deashboard/>},
      { path : `/doctor/payment-cancel/:userId`, element : <Doctor_deashboard/>},


      {// ============================================ =========== this section is only for doctor 
        path : "doctor" , element : <DoctorLayout/>,
        children : [
          { path : "dashboard", element : <Doctor_deashboard/>},
          { path : "new_patient", element : <Doctor_new_patient/>},
          { path : "return_patient", element : <Doctor_return_patient/>},
          { path : "member_patient", element : <Doctor_member_patient/>},
          { path : "shedule_patient", element : <Doctor_shedule_patient/>},
          { path : "active_patient", element : <Doctor_active_patient/>},
          { path : "complete_treatment", element : <Doctor_complte_treatment/>},
          { path : "reject_treatment", element : <Doctor_reject_treatment/>},
          { path : "support_list", element : <Doctor_support_list/>},
        ]
      },
      
      { // ============================================ ========= this section is only for admin section 
        path : "admin" , element : <AdminLayout/>,
        children : [
          { path : "dashboard", element : <Admin_Dashboard/>},
          { path : "patient", element : <Admin_patient_list/>},
          { path : "doctor", element : <Admin_doctor_list/>},
          { path : "employee", element : <Admin_employee_list/>},
          { path : "hospital", element : <Admin_hospital_list/>},
          { path : "country_hospital", element : <Admin_country_hospital_list/>},
          { path : "medicine", element : <Admin_medicine/>},
          { path : "travel", element : <Admin_travel/>},
          { path : "consultation", element : <Admin_consultation/>},
          { path : "profits", element : <Admin_profites/>},
          { path : "add_banner", element : <Admin_add_banner/>},
        ]
      },

      {// ============================================ =========== this section is only for travel 
        path : "travel" , element : <TravelLayout/>,
        children : [
          { path : "dashboard", element : <Travel_Dashboard/>},
          { path : "hospital", element : <Travel_hospital_list/>},
          { path : "hospital/:id", element : <Travel_hospital_view/>},
          { path : "patient", element : <Travel_Patient_list/>},
          { path : "patient/:id" , element : <Travel_User_order/>},
          { path : "new_appointment", element : <Travel_new_appointment/>},
          { path : "processing", element : <Travel_processing/>},
          { path : "complete", element : <Travel_complete_processing/>},
          { path : "rejected", element : <Travel_rejected/>},
          { path : "view/:id", element : <View_order/>},
          { path : "staff_panel", element : <StaffPanel/>},
          { path : "support_ist", element : <Travel_support_list/>},
          { path : "profile", element : <Travel_profile/>},
        ]
      },

      {// ============================================ =========== this section is only for medicine 
        path : "medicine" , element : <MedicineLayout/>,
        children: [
            { path: 'dashboard', element: <Medicine_Dashboard /> },
            { path: 'products', element: <ProductList /> },
            { path: 'clients', element: <ClientList /> },
            { path: 'clients/:clientId' , element : <CheckClientDetails/>},
            { path: 'orders/check', element: <CheckOrders /> },
            { path: 'orders/processing', element: <ProcessingOrders /> },
            { path: 'orders/complete', element: <CompleteOrders /> },
            { path: 'orders/rejected', element: <RejectedOrders /> },
            { path: 'prescription/:id', element: <ViewPrescription /> },
            { path: 'staff', element: <StaffPanel /> },
            { path: 'support', element: <SupportList /> },
            { path: 'profile', element: <Profile /> },
        ]
      },

      {// ======================================================= this section is only for consultation 
        path : "consultation" , element : <ConsultationLayout/>,
        children : [
          { path : "dashboard", element : <Consultation_Dashboard/>},
          { path : "user", element : <Consultation_user_to_doctor/>},
          { path : "doctor", element : <Consultation_doctor_list/>},
          { path : "doctor/:id", element : <Consultation_view_doctor/>},
          { path : "spespalist", element : <Consultation_spespalist/>},
          { path : "appointments", element : <Consultation_appointments/>},
          { path : "shedule", element : <Consultation_shedule/>},
          { path : "complete", element : <Consultation_Complete/>},
          { path : "rejected", element : <Consultation_Rejected/>},
          { path : "staff_panel", element : <StaffPanel/>},
          { path : "support_list", element : <Consultation_support_list/>},
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
