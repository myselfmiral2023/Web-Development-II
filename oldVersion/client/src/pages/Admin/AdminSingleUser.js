import React from "react";
import axios from "../../api/axios";
import { format } from "date-fns";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { userSchema } from "../../validations/UserValidation";
import { FontAwesomeIcon  } from "@fortawesome/react-fontawesome";
import { faStar, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Snackbar from "../../components/Snackbar/Snackbar";
import "./Admin.css";
const USER_URL = "/user";
const USER_PHOTO_URL = "/user/files";
const ALL_REVIEW_URL = "/review/userexp";
const BOOKING_URL = "/vehiclebooking/user"

const AdminSingleUser = () => {
  const [user, setUser] = useState({});

  const [userPhoto, setUserPhoto] = useState("");

  const [editSelected, setEditSelected] = useState(false);

  const [reviews, setReviews] = useState([]);

  const [bookings, setBookings] = useState([])

  const { id } = useParams();

  const [fullname, setFullName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      let formData = {
        fullname: e.target[0].value,
        email: e.target[1].value,
        password: e.target[2].value,
      };

      const isValid = await userSchema.isValid(formData);

      if (isValid) {
        const response = await axios.patch(`${USER_URL}/${id}`, {
          fullname,
          email,
          password,
        });

        console.log(response);
        if (response.status === 200) {
          setSuccess(true);
          setSuccessMsg(response.data.message);
          setEditSelected(false);
        }
      }
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No server response");
      } else {
        setError(true);
        setErrMsg(error.response.data);
      }
    }

    setEditSelected(false);
  };

  useEffect(() => {
    axios
      .get(`${USER_URL}/${id}`)
      .then((response) => {
        setUser(response.data);
        setFullName(response.data.fullname);
        setEmail(response.data.email);
        console.log(response);
        return axios.get(`${USER_PHOTO_URL}/userimg01.jpg`);
      })
      .then((secondReponse) => {
        console.log(`${USER_PHOTO_URL}/userimg01.jpg`);
        console.log(secondReponse);
        setUserPhoto(secondReponse.data);

        return axios.get(`${ALL_REVIEW_URL}/${id}`);
      })
      .then((thirdResponse) => {
        if(thirdResponse.data.length > 0){
        setReviews(thirdResponse.data)
      }
      return axios.get(`${BOOKING_URL}/${id}`)
      })
      .then((fourthResponse) => {
        setBookings(fourthResponse.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [editSelected]);

  const handleDeleteReview = () => {
    
  }

  const handleDeleteBooking = () => {
    
  }

  return (
    <div className="adminSingleUserContainer">
      {success && <Snackbar type="success" message={successMsg} />}
      {error && <Snackbar type="failure" message={errMsg} />}
      <div>
        {editSelected ? (
          <section className="userEditFormContainer">
            <div>
              <h1>Edit User</h1>
              <button
                className="returnButton"
                onClick={() => setEditSelected(false)}
              >
                Cancel Edit
              </button>
            </div>
            <div className="userEditFormAndPhoto">
              <img
                className="userImageProfile"
                src={userPhoto}
                alt={`Profile photo for user ${user.id}`}
              />
              <form onSubmit={handleEditSubmit}>
                <label htmlFor="fullname">Full Name:</label>
                <input
                  id="fullname"
                  type="text"
                  autoComplete="off"
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder="First and Last Name"
                  value={fullname}
                />
                <label htmlFor="fullname">Email:</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email"
                  value={email}
                />
                <label htmlFor="fullname">Password:</label>
                <input
                  id="password"
                  type="password"
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                  value={password}
                />
                <button className="editButton">Update User</button>
              </form>
            </div>
          </section>
        ) : (
          <section className="userDetailDisplay">
            <Link to="/admin/users">
              <button className="returnButton">Return to Users Page</button>
            </Link>
            <h1>Viewing User: {user.fullname}</h1>

            <ul>
              <li>
                <img
                  className="userImageProfile"
                  src={userPhoto}
                  alt={`Profile photo for user ${user.id}`}
                />
              </li>
              <li>
                <span>Full Name:</span> {user.fullname}
              </li>
              <li>
                <span>Email:</span> {user.email}
              </li>
              <li>
                <span>Role:</span> {user.role}
              </li>
              <li>
                <span>Loyalty member:</span>{" "}
                {user.role === "admin"
                  ? "admin"
                  : user.isLoyalty === 1
                  ? "Yes"
                  : "No"}
              </li>
              <li>
                <span>reward Points:</span>{" "}
                {user.role === "admin"
                  ? "admin"
                  : user.isLoyalty === 1
                  ? user.reward
                  : "N/A"}
              </li>
            </ul>
            <button
              className="editButton"
              onClick={() => setEditSelected(true)}
            >
              Edit User
            </button>
          </section>
        )}
      </div>
      <div className="reviewAndBookingContainer">
        <div className="adminSingleUserReviewContainer"></div>
        <h3>User's reviews</h3>
        <ul>
          {reviews.map((review, key) => (
            <li key={review.reviewid} className="reviewListItem">
              <ul className="reviewInfoHeading">
                <li>
                  Associated Order Number: {review.uuid}
                </li>
                <li>Vehicle : {review.name}</li>
                <li>
                  Rental session:{" "}
                  {format(new Date(review.bookingstart), "yyyy-MM-dd")} to{" "}
                  {format(new Date(review.bookingend), "yyyy-MM-dd")}
                </li>
                <li>
                  {[...Array(parseInt(review?.stars))].map((item) => (
                    <FontAwesomeIcon icon={faStar} />
                  ))}{" "}
                  Stars
                </li>
                <li>Review: {review?.comments}</li>
              </ul>
              <button className="adminDeleteReviewButton" onClick={handleDeleteReview(review.reviewid)}>Delete Review</button>
            </li>
          ))}
        </ul>
        <div className="adminSingleUserBookingContainer">
        <h3>User's Bookings</h3>
        <ul className="bookingPanel">
            {bookings.map((booking, key) => (
              <li key={booking.id} className="bookingListItem">
                
                <ul className="bookingInfoHeading">
                  
                  <li>Booking date : {format(new Date(booking.bookingdate), "yyyy-MM-dd")}</li>
                  <li>
                    Rental session:{" "}
                    {format(new Date(booking.startdate), "yyyy-MM-dd")} to{" "}
                    {format(new Date(booking.enddate), "yyyy-MM-dd")}
                  </li>
                  <li>
                    Cost: {booking.cost}
                  </li>
                  <li>Order number: {booking.uuid}</li>
                </ul>
                <button className="adminDeleteBookingButton" onClick={handleDeleteBooking(booking.id)}>Delete Booking</button>
              </li>
            ))}
          </ul>
          </div>
      </div>
    </div>
  );
};

export default AdminSingleUser;
