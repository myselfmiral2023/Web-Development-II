import { useState, useEffect } from "react";
import axios from "../../api/axios";
import "./Admin.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'
import useAuth from "../../hooks/useAuth";
import AdminNavBar from "../../components/NavBar/AdminNavBar";
const REVIEW_URL = "/review";

const AdminReviews = () => {
  const [reviews, setReviews] = useState();

  const {auth} = useAuth();

  useEffect(() => {
    axios
      .get(REVIEW_URL)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
    <AdminNavBar/>
    <article className="reviewList">
      Driven Auto Rental User Reviews
      <h2>Review List</h2>
      {reviews?.length ? (
        <div className="reviewCard">
          <ul>
            {reviews.map((review, key) => (
              <li key={review.id} className="reviewListItem">
                <div>
                  <ul>
                    <li>{review?.comments}</li>
                    <li>Stars: 
                      {[...Array(parseInt(review?.stars))].map((item) => <FontAwesomeIcon icon={faStar}/>)}</li>
                  </ul>
                </div>
                <div className="reviewListItemButtons">
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

export default AdminReviews