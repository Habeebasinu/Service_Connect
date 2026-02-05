import React from 'react'
import Providerheader from '../pages/provider/Providerheader.jsx'
import Sidebar from '../pages/provider/Sidebar.jsx'
import { Outlet } from 'react-router-dom'

function ProviderLayout() {
  return (
    <div className="w-full h-screen flex flex-col">
      <Providerheader />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 bg-gray-50 overflow-y-auto">
          <Outlet />   
        </main>
      </div>
    </div>
  )
}

export default ProviderLayout
