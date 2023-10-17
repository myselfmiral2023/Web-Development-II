import { useState, useEffect } from "react";
import axios from "../../api/axios";
import "./Admin.css";
import useAuth from "../../hooks/useAuth";
import AdminNavBar from "../../components/NavBar/AdminNavBar";
const BOOKING_URL = "/review";

const AdminBookings = () => {
  const [bookings, setBookings] = useState();

  const {auth} = useAuth();


  return (
    <>
    <AdminNavBar/>
    
    </>
  )
}

export default AdminBookings