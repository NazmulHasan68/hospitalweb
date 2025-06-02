import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, LogOut } from "lucide-react";
import Logo from  "@/assets/glogo.png";
import { motion } from "framer-motion";
import { useLoadUserQuery, useLogoutUserMutation } from "@/redux/ApiController/authApi";
import { toast } from "sonner";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function NavigationBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useLoadUserQuery();
  const [logoutUser] = useLogoutUserMutation();

  const searchHandler = (e) =>{
    e.preventDefault();

   
    navigate(`/search?query=${searchQuery}`)
    
    setSearchQuery("")
  }


  const handleLogout = async () => {
    try {
      await logoutUser();  
      toast.success("Logout successfully!")
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <nav className=" fixed shadow-xl top-0 left-0 w-full bg-blue-50 z-50">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
            {/* Logo */}
            <Link to={"/"} className="text-xl font-bold flex items-center">
              <img src={Logo} className="h-16 md:h-16 object-cover" alt="Logo" />
            </Link>

             {/* Search Bar (Hidden on Mobile) */}
            <form onSubmit={searchHandler} className="hidden md:flex items-center border border-gray-300 rounded-full px-3 py-1">
              <Search className="text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Search..."
                autoComplete="off"
                onChange={(e) => setSearchQuery(e.target.value)}
                className=" outline-none bg-transparent md:w-40 lg:w-64"
              />
            </form>

            {isLoading ? (
              <p className="text-cyan-800 font-medium">Loading...</p>
            ) : !data?.user ? (
              <div className="flex gap-4">
                <Link to="/auth/login" className="hover:text-blue-500 text-blue-600 font-medium">Login</Link>
                <Link to="/auth/signup" className="hover:text-blue-500 text-blue-600 font-medium">Signup</Link>
              </div>
            ) : (
              <div className="flex gap-4 items-center">

                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <img
                      src={data.user.photoUrl}
                      className="w-10 h-10 rounded-full border hover:border-blue-500"
                      alt="User Profile"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mt-2 bg-blue-50">
                    <DropdownMenuLabel className="text-blue-500 font-bold  bg-slate-100 rounded-md">{data?.user?.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator className="border border-blue-400" />
                    <DropdownMenuItem>
                      <Link to={'user_panel'} className="text-blue-500 hover:text-blue-700">
                        User panel
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to={'/user_panel/cost'} className="text-blue-500 hover:text-blue-700">
                        Check Schedule
                      </Link>
                    </DropdownMenuItem>
                    {
                      data?.user.role == 'Admin' ? (
                        <DropdownMenuItem>
                          <Link to={'admin'} className="text-blue-500 hover:text-blue-700">
                            Admin Panel
                          </Link>
                        </DropdownMenuItem>
                      ) : null
                    }
                    {
                      data?.user.role == 'manager' ? (
                        <DropdownMenuItem>
                          <Link to={'admin-panel-my-course/course'} className="text-sky-700 hover:text-blue-700">
                            manage
                          </Link>
                        </DropdownMenuItem>
                      ) : null
                    }
                    {
                      data?.user.role == 'doctor' ? (
                        <DropdownMenuItem>
                          <Link to={'doctor'} className="text-blue-500 hover:text-blue-700">
                            Doctor panel
                          </Link>
                        </DropdownMenuItem>
                      ) : null
                    }
                    {
                      data?.user.role == 'travel' ? (
                        <DropdownMenuItem>
                          <Link to={'travel'} className="text-blue-500 hover:text-blue-700">
                            Travel Manager
                          </Link>
                        </DropdownMenuItem>
                      ) : null
                    }
                    {
                      data?.user.role == 'medicine' ? (
                        <DropdownMenuItem>
                          <Link to={'medicine'} className="text-blue-500 hover:text-blue-700">
                            Medicine Manager
                          </Link>
                        </DropdownMenuItem>
                      ) : null
                    }
                    {
                      data?.user.role == 'consultation' ? (
                        <DropdownMenuItem>
                          <Link to={'consultation'} className="text-blue-500 hover:text-blue-700">
                            consultation Manager
                          </Link>
                        </DropdownMenuItem>
                      ) : null
                    }
                  </DropdownMenuContent>
                </DropdownMenu>


                <button onClick={handleLogout}>
                  <LogOut className="text-blue-700 hover:text-blue-500 cursor-pointer" />
                </button>
              </div>
            )}

        </div>
        <div className="bg-blue-500 border-b-2 border-gray-50">
          <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
            {/* Navigation Links (Desktop) */}
            <div className="text-xl md:text-sm lg:text-xl flex space-x-2 md:space-x-6 items-center">
              <Link to="/user_medicine" className="hover:bg-blue-700 overflow-hidden py-1 px-3 text-white font-medium">Medicine</Link>
              <Link to="/user_travel" className="hover:bg-blue-700 overflow-hidden py-1 px-3 text-white font-medium">Trval</Link>
              <Link to="/user_consultation" className="hover:bg-blue-700 overflow-hidden py-1 px-3 text-white font-medium">Doctor</Link>
              <Link to="/helpline" className="hover:bg-blue-700 overflow-hidden py-1 px-3 text-white font-medium">Helpline</Link>
            </div>
          </div>
        </div>

     
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5 }}
          className="md:hidden fixed top-14 left-0 w-full z-50 bg-slate-50 shadow-md p-4 flex flex-col items-center mt-4 space-y-4"
        >
          <Link to="/book" className="hover:text-rose-500 text-cyan-800 font-medium" onClick={() => setIsOpen(false)}>Books and Exam</Link>
          <Link to="/ask" className="hover:text-rose-500 text-cyan-800 font-medium" onClick={() => setIsOpen(false)}>Q/A</Link>
          <Link to="/about" className="hover:text-rose-500 text-cyan-800 font-medium" onClick={() => setIsOpen(false)}>About</Link>

          {isLoading ? (
            <p className="text-cyan-800 font-medium">Loading...</p>
          ) : !data?.user ? (
            <>
              <Link to="/auth/login" className="hover:text-rose-500 text-rose-600 font-medium" onClick={() => setIsOpen(false)}>Login</Link>
              <Link to="/auth/signup" className="hover:text-rose-500 text-rose-600 font-medium" onClick={() => setIsOpen(false)}>Signup</Link>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <button onClick={handleLogout} className="flex items-center gap-2 font-medium text-cyan-800 hover:text-rose-500 cursor-pointer">
                <p>Logout</p>
                <LogOut />
              </button>
            </div>
          )}

          <div className="flex items-center border border-gray-300 rounded-full px-3 py-1">
            <Search className="text-gray-500" size={20} />
            <input type="text" placeholder="Search..." className="ml-2 outline-none bg-transparent w-52 md:w-48 lg:w-72" />
          </div>
        </motion.nav>
      )}
    </>
  );
}


  //  <div className="max-w-6xl mx-auto px-4 bg-green-500 flex justify-between items-center">
  //         {/* Mobile Menu Button */}
  //         <div className=" flex justify-between items-center gap-2 md:hidden">
  //           {data?.user && (
  //             <DropdownMenu>
  //               <DropdownMenuTrigger className=" outline-none">
  //                 <img
  //                   src={data?.user.photoUrl}
  //                   className="w-10 h-10 rounded-full border hover:border-rose-500"
  //                   alt="User Profile"
  //                 />
  //               </DropdownMenuTrigger>
  //               <DropdownMenuContent className="mt-8">
  //                 <DropdownMenuLabel className="text-sky-600 font-bold bg-slate-100 rounded-md">{data?.user?.name}</DropdownMenuLabel>
  //                 <DropdownMenuSeparator />
  //                 <DropdownMenuItem>
  //                   <Link to={'/my/learning'} className="text-sky-700 hover:text-rose-500">
  //                     My Learing
  //                   </Link>
  //                 </DropdownMenuItem>
  //                 <DropdownMenuItem>
  //                   <Link to={'/my/profile'} className="text-sky-700 hover:text-rose-500">
  //                     My Profile
  //                   </Link>
  //                 </DropdownMenuItem>
  //                   {
  //                     data?.user.role == 'instructor' ? (
  //                       <DropdownMenuItem>
  //                         <Link to={'admin-panel-my-course/course'} className="text-sky-700 hover:text-rose-500">
  //                           Dashboard
  //                         </Link>
  //                       </DropdownMenuItem>
  //                     ) : null
  //                   }
  //               </DropdownMenuContent>
  //             </DropdownMenu>
  //           )}

  //           <button
  //             onClick={() => setIsOpen(!isOpen)}
  //             className="md:hidden focus:outline-none"
  //             aria-label="Toggle Menu"
  //           >
  //             {isOpen ? <X className="font-bold text-rose-600" size={30} /> : <Menu className="font-bold" size={30} />}
  //           </button>
  //         </div>
  //       </div>