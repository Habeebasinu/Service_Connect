import React from 'react'
import Adminheader from '../pages/admin/Adminheader.jsx'
import AdminSidebar from '../pages/admin/AdminSidebar.jsx'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
  return (
      <div className="w-full h-screen flex flex-col">
      <Adminheader />

      <div className="flex flex-1">
        <AdminSidebar/>

        <main className="flex-1 bg-gray-50 overflow-y-auto">
          <Outlet />   
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
