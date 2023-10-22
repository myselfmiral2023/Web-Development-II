import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./LeaveAReview.css"
import axios from '../../api/axios';
import { AuthContext } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Snackbar from '../Snackbar/Snackbar';
const REVIEW_URL = "/review"

const LeaveAReview = ({setOpen, bookingid}) => {

    const navigate = useNavigate();

    const [stars, setStars] = useState(0);
    
    const [comments, setComments] = useState("");


    const {user} = useContext(AuthContext)

    const userId = JSON.parse(localStorage.getItem("user")).id;

    // const review = new Review({
    //     userid: req.body.userid,
    //     bookingid: req.body.bookingid,
    //     comments: req.body.comments,
    //     stars: req.body.stars,
    //     createdAt:  new Date()
    // });

  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState("");
  const [reviewError, setReviewError] = useState(false);
  const [reviewErrorMsg, setReviewErrorMsg] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
            .post(`${REVIEW_URL}`, {userid: userId, bookingid: bookingid, comments: comments, stars: stars })
            .then((response) => {
              if (response.status === 201) {

                setReviewSuccess(true);
                setReviewSuccessMsg("Your review was uploaded");
                
              } 
            })
            .catch((error) => {
              console.log(error);
              setReviewError(true);
              setReviewErrorMsg(error.response.data)
            })
            setStars(5);
            setComments("");
    }

    const handleClose = () => {
        setStars(5)
        setComments("")
        setOpen(false);
      }

  return (
    <>
    
    <div className='leaveAReview'>
    {reviewSuccess && <Snackbar type="success" message={reviewSuccessMsg} />}
      {reviewError && <Snackbar type="failure" message={reviewErrorMsg} />}
        <div className="leaveAReviewContainer">
        {<FontAwesomeIcon
          icon={faCircleXmark}
          className="reviewClose"
          onClick={handleClose}
        />}
        <div>
        <form onSubmit={handleSubmit} id='stars'>
        <label htmlFor="stars">Stars:</label>
                    <select
                      id="stars"
                      name="stars"
                      form="stars"
                      value={stars}
                      required
                      onChange={(e) => setStars(e.target.value)}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    <label htmlFor="newReview">Comments:</label>
                    <textarea
                      name="newReview"
                      id={`reviewTextArea`}
                      cols="30"
                      rows="10"
                      value={comments}
                      required
                      onChange={(e) => setComments(e.target.value)}
                    ></textarea>
                    {!reviewSuccess && <button disabled={reviewSuccess ? true : false} className='submitReviewButton'>Submit Review</button>}
        </form>
        </div>
        {reviewSuccess && <div className="successReturnToProfileButtonContainer"><button className="successReturnToProfileButton" onClick={() => navigate("/profile")}>Return to Profile</button>
        </div>}
        </div>
    </div>
    </>
  )
}

export default LeaveAReview