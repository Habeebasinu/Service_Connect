import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/user/Sidebar";
import UserHeader from "../pages/user/UserHeader.jsx";
import UserHome from "../pages/user/UserHome.jsx";
import Userbooking from "../pages/user/Userbooking.jsx";
import { Routes,Route } from "react-router-dom";
import  Profile from '../components/auth/Profile.jsx'
import Viewbookings from "../pages/user/Viewbookings.jsx";


function UserLayout() {
  return (
    <div className="flex h-screen">
 
      <Sidebar />

      <div className="flex flex-col flex-1">

   
        <UserHeader />

        
        <main className="flex-1  bg-gray-50 overflow-y-auto">
           <Routes>
                <Route index element={<UserHome />} />
                <Route path="/home" element={<UserHome />} />
                <Route path="/bookings" element={<Userbooking />} />
                <Route path="/profiles" element={<Profile />} />
                <Route path="/viewbook" element={<Viewbookings />} />


              </Routes>
       
        </main>

      </div>
    </div>
  );
}

export default UserLayout;
