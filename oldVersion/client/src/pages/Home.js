import React, { useEffect, useState, useContext } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar/Navbar";
import Header from "../components/Header/Header";
import Types from "./Types";
import Profile from "./Profile";
import Layout from "../components/Layout";
import Confirm from "./Confirm";
import Missing from "./Missing";
import Unauthorized from "./Unauthorized";
import AdminBookings from "./Admin/AdminBookings";
import AdminData from "./Admin/AdminData";
import AdminReviews from "./Admin/AdminReviews";
import AdminUsers from "./Admin/AdminUsers";
import AdminVehicles from "./Admin/AdminVehicles";
import axios from "../api/axios";
import { SearchContext } from '../contexts/SearchContext';
const VEHICLE_UNIT_URL = "/vehicle";

const Home = () => {

  const navigate = useNavigate();

  const [vehicleUnits, setVehicleUnits] = useState([]);

  const {dispatch, dates} = useContext(SearchContext)

  const getCarUnits = () => {
    
    axios
      .get(VEHICLE_UNIT_URL)
      .then((response) => {
        if (response.data.length > 6){
        const wildCard = Math.floor((Math.random() * (response.data.length - 6)))
        const selection = response.data.slice(wildCard, wildCard + 6)
        console.log(selection)
        setVehicleUnits(selection);
      }else {
        setVehicleUnits(response.data)
      }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCarUnits();
  }, []);

  const handleLearnMore = (id) => {
    dispatch({type: "NEW_SEARCH", payload: {dates}})
    navigate(`/vehicle/${id}`, { state: {dates}})
  }

  return (
    <>
      
      <div>
        <Header />
      </div>
      <div className="homeContainer">
        <h1 className="typeTitle">
          Our Car Types on Offer (availability may vary by date){" "}
        </h1>
        <div className="typeList">
          {vehicleUnits?.length ? (
            <div className="typeCard">
              <ul>
                {vehicleUnits.map((vehicleUnit, key) => (
                  <li key={vehicleUnit.id} className="typeListItem">
                    <ul className="vehicleInfoHeading">
                      <li>{vehicleUnit?.name}</li>
                      <li>{vehicleUnit?.company}</li>
                      <li>{vehicleUnit?.year}  {vehicleUnit?.typename}</li>
                    </ul>

                    <div className="typeListItemImage grow-rotate-on-hover">
                      <img
                        src={process.env.PUBLIC_URL + "/nissanMaxima.jpg"}
                        alt="car placeholder image"
                      />
                    </div>
                    <div className="typeListItemButtons">
                      <p>Starting at <span id="perdayPrice">${vehicleUnit.perdayrent}</span> per day</p>

                      <button onClick={() => handleLearnMore(vehicleUnit.id)}>Learn More</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No types to display</p>
          )}
        </div>
      </div>
      <div className="links">
        {/* Public Links */}
        <p>TESTING</p>
        <Link to="/login">
          {" "}
          <button>Login</button>
        </Link>
        <Link to="/register"> register</Link>
        <Link to="/types"> types</Link>
        <Link to="/unauthorized">unauthorized</Link>
        {/* Private Links */}
        <Link to="/profile">profile</Link>
        <Link to="/confirm">confirm</Link>
        <Link to="/admin/bookings">admin bookings</Link>
        <Link to="/admin/data">admin data</Link>
        <Link to="/admin/reviews">admin reviews</Link>
        <Link to="/admin/users">admin users</Link>
        <Link to="/admin/vehicles">admin vehicles</Link>

        {/* Catch all */}
        <Link to="*" element={<Missing />}>
          Missing{" "}
        </Link>
      </div>
      
    </>
  );
};

export default Home;
