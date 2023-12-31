import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import Snackbar from "../components/Snackbar/Snackbar";
import { FontAwesomeIcon  } from "@fortawesome/react-fontawesome";
import { faStar, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./Profile.css";
const USER_URL = "/user";
const REVIEW_URL = "/review"
const BOOKING_URL = "/vehiclebooking/user"
const ALL_REVIEW_URL = "/review/userexp";

const USER_PHOTO_UPLOAD_URL = "/user/upload"
const USER_PHOTO_URL = "/user/files"

const Profile = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({});

  const [userPhoto, setUserPhoto] = useState("");

  const [file, setFile] = useState(null);

  // const [imageUrl, setImageUrl] = useState(null);

  const [reviews, setReviews] = useState([]);

  const [userid, setUserId] = useState(0);
  const [bookingid, setBookingId] = useState(0);

  const [currReview, setCurrReview] = useState(0);

  const [currBooking, setCurrBooking] = useState(0);

  const [editSelected, setEditSelected] = useState(false);

  const [updatedComments, setUpdatedComments] = useState("");

  const [updatePhotoSuccess, setUpdatePhotoSuccess] = useState(false);

  const [editSuccess, setEditSuccess] = useState(false);
  const [editSuccessMsg, setEditSuccessMsg] = useState("");
  const [editError, setEditError] = useState(false);
  const [editErrorMsg, setEditErrorMsg] = useState("");

  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteSuccessMsg, setDeleteSuccessMsg] = useState("");
  const [deleteError, setDeleteError] = useState(false);
  const [deleteErrorMsg, setDeleteErrorMsg] = useState("");

  const [updatedStars, setUpdatedStars] = useState(5);

  const [bookings, setBookings] = useState([]);

  const userId = JSON.parse(localStorage.getItem("user")).id;

  const userEmail = JSON.parse(localStorage.getItem("user")).email;

  useEffect(() => {
    axios
      .get(USER_URL + `/${userId}`)
      .then((response) => {
        setUser(response.data);

        return axios.get(`${ALL_REVIEW_URL}/${userId}`);
      })
      .then((secondResponse) => {
        setReviews(secondResponse.data);

        return axios.get(`${BOOKING_URL}/${userId}`)
      })
      .then((thirdResponse) => {
        setBookings(thirdResponse.data)

        
        return axios.get(`${USER_PHOTO_URL}/${userEmail}.jpg`)
      })
      .then((fourthResponse) => {
        console.log(`${USER_PHOTO_URL}/${userEmail}.jpg`)
        console.log(fourthResponse)
        setUserPhoto(fourthResponse.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [editSuccess, editError, deleteSuccess, deleteError, updatePhotoSuccess]);

  const handleSelectReview = (id, bookingid) => {
    setUpdatedComments("")
    setEditSuccess(false)
    setCurrReview(id)
    setBookingId(bookingid)

    console.log("Current Review");
    console.log(currReview);
  }

  

  const handleEditSelected = () => {
    setEditSelected(true);
    console.log("Current Review after edit selected");
    console.log(currReview);
  };

  const handleCloseEdit = () => {
    setUpdatedComments("")
    setUpdatedStars(5);
    setEditSelected(false);
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    axios
        .patch(`${REVIEW_URL}/${currReview}`, {userid: userId, bookingid: bookingid, id: currReview,comments: updatedComments, stars: updatedStars, })
        .then((response) => {
          if (response.status === 200) {
            setEditSuccess(true);
            setEditSuccessMsg(response.data.message);
            setEditSelected(false);
          } 
        })
        .catch((error) => {
          console.log(error);
          setEditError(true);
          setEditErrorMsg(error.response.data)
        })
  }

  const handleDelete = () => {
    
    axios
        .delete(`${REVIEW_URL}/${currReview}`)
        .then((response) => {
          // console.log(response)
          setDeleteSuccess(true);
          setDeleteSuccessMsg(response.data.message)
        })
        .catch((error) => {
          setDeleteError(true);
          setDeleteErrorMsg(error.response.data)
        })
  }

  const handleUpdatePhoto = (e) => {
    e.preventDefault();
      axios
          .delete(`${USER_PHOTO_URL}/${user.email}.jpg`)
          .then((response) => {

            console.log(response);
            const formData = new FormData();

            const newFileName = user.email + ".jpg";
            const blob = new Blob([file], { type: file.type });
            blob.name = newFileName;

            const renamedFile = new File([blob], newFileName, { type: file.type });

            formData.append("file", renamedFile);

            return axios.post(USER_PHOTO_UPLOAD_URL, formData);
          })
          .then((secondResponse) => {
            console.log(secondResponse.data)

            return axios.get(`${USER_PHOTO_URL}/${user.email}.jpg`)
          })
       .then((thirdResponse) => {
          console.log(file);

          // const reader = new FileReader();

          // reader.onloadend = () => {
          //   reader.readAsDataURL(file);
          //   setImageUrl(reader.result);
          // }



          setUserPhoto(thirdResponse.data);
          setUpdatePhotoSuccess(true);
          setEditSuccess(true);
          setEditSuccessMsg("Your Photo has been updated");
       })
       .catch((error) => {
        console.log(error);
        setEditError(true);
        setEditErrorMsg(error.response.data)
       })
      }  


  const handleAddPhoto = () => {
            const formData = new FormData();

            const newFileName = user.email + ".jpg";
            const blob = new Blob([file], { type: file.type });
            blob.name = newFileName;

            const renamedFile = new File([blob], newFileName, { type: file.type });

            formData.append("file", renamedFile);

            axios
            .post(USER_PHOTO_UPLOAD_URL, formData)
            .then((response) => {

              setEditSuccessMsg("Your Photo has been added");
              setEditSuccess(true);

              return axios.get(`${USER_PHOTO_URL}/${user.email}.jpg`)
            })
            .then((secondResponse) => {
              setUpdatePhotoSuccess(true);
              setUserPhoto(secondResponse.data);
            })
            .catch((error) => {
              console.log(error);
              setEditError(true);
              setEditErrorMsg(error.response.data)
             })
  }

  return (
    <article className="profileMain">
      {editSuccess && <Snackbar type="success" message={editSuccessMsg} />}
      {editError && <Snackbar type="failure" message={editErrorMsg} />}
      {deleteSuccess && <Snackbar type="success" message={deleteSuccessMsg} />}
      {deleteError && <Snackbar type="failure" message={deleteErrorMsg} />}
      <div className="profileTop">
        <h1>User Profile</h1>
        <img
                className="profilePicture"
                src={userPhoto}
                alt={`Profile photo for user ${user.id}`}
              />
              <form onSubmit={handleUpdatePhoto} className="updatePhotoForm">
               <label className="file" htmlFor="file">
            Update Profile Photo (please wait a minute for changes to take effect)
        </label>
        <input
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button disabled={!file ? true : false} className="updatePhotobutton" >Update</button>
          </form>
          <button disabled={!file ? true : false} className="userProfileAddPhotoButton" onClick={handleAddPhoto}>Add Photo</button>
        <h2>Profile for {user.fullname}</h2>
        <p>Email: {user.email}</p>
      </div>
      <div className="profileContainer">
        <div className="profileReviewContainer">
          <br />
          <h3>My Rental Reviews</h3>
          <ul>
            
            {reviews.map((review, key) => (
              <li key={review.id} className="reviewListItem">
                {console.log(review)}
                {console.log("review id's printing:")}
                {console.log(review.id)}
                <ul className="reviewInfoHeading">
                  <li ><input className="reviewCheckBox" type="checkbox" checked={currReview === review.id ? true : false} onChange={() => handleSelectReview(review.id, review.bookingid)}/></li>
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
                
                {editSelected && currReview === review.id && (
                  <div className="editForm" onSubmit={handleEditSubmit}>
                    <div className="closeEditButtonContainer">
                    <FontAwesomeIcon icon={faCircleXmark} className="closeEditButton" onClick={handleCloseEdit}/>
                    </div>
                    <form id="stars">
                    <label htmlFor="stars">Stars:</label>
                    <select
                      id="stars"
                      name="stars"
                      form="stars"
                      value={updatedStars}
                      required
                      onChange={(e) => setUpdatedStars(e.target.value)}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    <textarea
                      name="editReview"
                      id={`review${review.reviewid}`}
                      cols="30"
                      rows="10"
                      value={updatedComments}
                      onChange={(e) => setUpdatedComments(e.target.value)}
                    ></textarea>
                    <button>Submit</button>
                    </form>
                  </div>
                )}

                {!editSelected && (
                  <div className="reviewListItemButtons">
                    <button className="reviewEditButton" onClick={handleEditSelected} disabled={currReview !== review.id? true : false}>Edit</button>
                    <button className="reviewDeleteButton" onClick={handleDelete} disabled={currReview !== review.id? true : false}>Delete</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="profileBookingContainer">
          <Link to="/">
            <button className="makeANewBookingButton" onClick={() => navigate("/")}>Make a new Booking</button>
          </Link>
          <br />
          <h3>My Bookings</h3>
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
                <div className="bookingButtonContainer">
                  <button className="bookingMoreOptionsButton" onClick={() => navigate(`/booking/${booking.id}`)}>
                    More Options
                    </button> 
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
};

export default Profile;
