import React from 'react'
import AdminNavBar from '../../components/NavBar/AdminNavBar'
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import "./Admin.css";
import useAuth from "../../hooks/useAuth";
const VEHICLE_URL = "/vehicle";

const AdminVehicles = () => {
  
    
  const [vehicles, setVehicles] = useState();

  const {auth} = useAuth();

  useEffect(() => {
    axios
      .get(VEHICLE_URL)
      .then((response) => {
        setVehicles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
    <AdminNavBar/>
    <article className="vehicleList">
      Driven Auto Rental Vehicle Unit List
      <h2>Vehicle List</h2>
      <br />
      <button>Add New Vehicle to Fleet</button>
      {vehicles?.length ? (
        <div className="vehicleCard">
          <ul>
            {vehicles.map((vehicle, key) => (
              <li key={vehicle.id} className="vehicleListItem">
                <div>
                  <ul>
                    <li>{vehicle?.name}</li>
                    <li>{vehicle?.company}</li>
                    <li>${vehicle?.perdayrent} Per week</li>
                  </ul>
                </div>
                <div className="vehicleListItemButtons">
                  <button>Update</button>
                  <button>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No reviews to display</p>
      )}
    </article>
    </>
  )
  
}

export default AdminVehicles