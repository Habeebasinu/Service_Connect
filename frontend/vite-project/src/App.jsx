import React from 'react'
import './App.css'
import { BrowserRouter,Routes,Router, Route } from 'react-router-dom'
import NAV from '../src/components/Layout/Nav.jsx'
import HOME from '../src/pages/Home.jsx'
import Register from './components/auth/Register.jsx'
import UserR from '../src/pages/user/UserSignup.jsx'
import Log from '../src/components/auth/Login.jsx'
import UserLayout from './layouts/UserLayout.jsx'
import UserHome from './pages/user/UserHome.jsx'
import Nav from '../src/components/Layout/Nav.jsx'
import ProviderLayout from './layouts/ProviderLayout.jsx'
import ProviderHome from './pages/provider/ProviderHome.jsx'
import ManageServices from './pages/provider/ManageServices.jsx'
import Profile from './components/auth/Profile.jsx'
import AddServices from './pages/provider/AddServices.jsx'
import Adimndashboard from './pages/admin/Adimndashboard.jsx'
import ServiceDetails from './pages/user/ServiceDetails.jsx'
import BookService from './pages/user/BookService.jsx'
import EditBooking from './pages/user/EditBooking.jsx'
import RateService from './pages/user/RateService.jsx'
import Viewallbookings from './pages/provider/Viewallbookings.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'
import Adminhome from './pages/admin/Adminhome.jsx'
import ManageService from './pages/admin/ManageService.jsx'
import BookingMonitoring from './pages/admin/BookingMonitoring.jsx'
import EditServices from './pages/provider/EditServices.jsx'


function App() {
  

  return (
    <>
    <BrowserRouter>
    
    <main className="pt-10">
        <Routes>
          <Route path="/" element={<><Nav/> <HOME /></>} />
          <Route path="/sign" element={<><Nav/><Register /></>} />
          <Route path="/use" element={<UserR />} />
          <Route path="/log" element={<><Nav/><Log /></>} />
          <Route path="/admin" element={<><Nav/><Adimndashboard/></>} />
          <Route  path="addservice" element={<AddServices />}/>
          <Route  path="/details/:id" element={<ServiceDetails/>}/>
          <Route  path="/books/:id" element={<BookService/>}/>
          <Route  path="/editbooking/:id" element={<EditBooking/>}/>
         <Route  path="/rateservice/:id" element={<RateService/>}/>
           <Route path="/serviceupdate/:id" element={<EditServices />} />
         





                 
    <Route path="/user/*" element={<UserLayout/>} ></Route>

  <Route path="/provider/*" element={<ProviderLayout />}>
  <Route index element={<ProviderHome />} />
  <Route path="home" element={<ProviderHome />} />
  <Route path="profiles" element={<Profile />} />
  <Route path="service" element={<ManageServices />} />
   <Route path="booking" element={<Viewallbookings />} />



</Route>

       <Route path='/admin/*' element={<AdminLayout/>}>
       <Route index element={<Adminhome/>}/>
       <Route path='home' element={<Adminhome/>}/>
       <Route path='manageservice' element={<ManageService/>}/>
       <Route path='allbooks' element={<BookingMonitoring/>}/>



       </Route>

        </Routes>
      </main>
    </BrowserRouter>
     
    </>
  )
}

export default App
