import { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import "./Profile.css";
const USER_URL = "/user";

const Profile = () => {
  const [user, setUser] = useState({});

  const userId = JSON.parse(localStorage.getItem("user")).id;

  useEffect(() => {
    axios
      .get(USER_URL + `/${userId}`)
      .then((response) => setUser(response.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <article className="profileMain">
      <div className="profileTop">
        <h1>User Profile</h1>
        <h2>Profile for {user.fullname}</h2>
      </div>
      <div className="profileContainer">
        <div className="profileReviewContainer">
          <button>Leave a new Review</button>
          <br />
          <h3>My Rental Reviews</h3>
        </div>
        <div className="profileBookingContainer">
        <Link to="/"><button>Make a new Booking</button></Link>
          <br />
          <h3>My Bookings</h3>
        </div>
      </div>
    </article>
  );
};

export default Profile;
