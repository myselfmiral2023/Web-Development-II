import React, {useEffect, useState} from 'react'
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
import axios from '../api/axios';

const CARTYPE_URL = '/vehicletype'

const Home = () => {
  const [types, setTypes] = useState([]);

  const getCarTypes = () => {
    axios
      .get(CARTYPE_URL)
      .then((response) => {
        setTypes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getCarTypes();
  }, []);

  return (
    <>
    <div>
        <Header/>
      

    </div>
      <h1 className='typeTitle'>Our Car Types on Offer (availability may vary by date) </h1>
    <div className='typeList'>
    {types?.length ? (
        <div className="typeCard">
          <ul>
            {types.map((type, key) => (
              <li key={type.id} className="typeListItem">
                <div>
                  <ul>
                    <li>{type?.typename}</li>
                    <li>{type?.year}</li>
                  </ul>
                </div>
                <div className="typeListItemImage">
                  <img src={process.env.PUBLIC_URL + '/nissanMaxima.jpg'} alt="car placeholder image" />
                </div>
                <div className="typeListItemButtons"> 
                  <button>Learn More</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No types to display</p>
      )}
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