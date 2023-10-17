import React from 'react'
import "./Home.css";
import {Link} from 'react-router-dom'
import Navbar from '../components/NavBar/Navbar';
import Header from '../components/Header/Header';
import Types from "./Types";
import Profile from "./Profile";
import Layout from "../components/Layout"
import Confirm from './Confirm'
import Missing from './Missing'
import Unauthorized from './Unauthorized'
import AdminBookings from './Admin/AdminBookings'
import AdminData from './Admin/AdminData'
import AdminReviews from './Admin/AdminReviews'
import AdminUsers from './Admin/AdminUsers'
import AdminVehicles from './Admin/AdminVehicles'

const Home = () => {
  return (
    <>
    <div>
        <Header/>
      

    </div>
    <div className='links'>
         {/* Public Links */}
       <p>TESTING</p>
         <Link to="/login" > <button>Login</button></Link>
          <Link to="/register"  > register</Link>
          <Link to="/types" > types</Link>
          <Link to="/unauthorized"  >unauthorized</Link>
          {/* Private Links */}
          <Link to="/profile"  >profile</Link>
          <Link to="/confirm"  >confirm</Link>
          <Link to="/admin/bookings"  >admin bookings</Link>
          <Link to="/admin/data"  >admin data</Link>
          <Link to="/admin/reviews"  >admin reviews</Link>
          <Link to="/admin/users"  >admin users</Link>
          <Link to="/admin/vehicles"  >admin vehicles</Link>

            {/* Catch all */}
            <Link to="*" element={<Missing/>}>Missing </Link>
    </div>
    </>
  )
}

export default Home