import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SearchContext } from "../contexts/SearchContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faStar } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../contexts/AuthContext";
import Checkout from "../components/Checkout/Checkout";
import axios from "../api/axios";
import "./UserSearchVehicle.css";
import "./UserSingleVehicle.css";
import { format } from "date-fns";
const VEHICLE_URL = "/vehicle";
const VEHICLE_PHOTO_URL = "/vehicletype/files";
const VEHICLE_REVIEW_URL = "/review/vehicleexp";

const VEHICLE_TYPE_DICT = {
  1: "SUV",
  2: "Van",
  3: "Economy",
  4: "Sports Car",
  5: "Sedan",
  6: "Compact",
  7: "Pickup Truck",
  8: "Minivan",
};

const UserSearchVehicle = () => {
  const navigate = useNavigate();

  const { user} = useContext(AuthContext);

  const { dates } = useContext(SearchContext);

  const [subtotal, setSubtotal] = useState(0);

  const [price, setPrice] = useState(0);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

  const dayDifference = (date1, date2) => {
    try {
      const timeDiff = Math.abs(date2.getTime() - date1.getTime());
      const dayDelta = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
      return dayDelta;
    } catch (error) {
      console.log(error);
    }
  };

  const rentalDays = dayDifference(dates[0]?.endDate, dates[0]?.startDate) + 1;

  const { id } = useParams();

  const [vehicle, setVehicle] = useState({});

  const [vehiclePhoto, setVehiclePhoto] = useState("");

  const [reviews, setReviews] = useState([]);

  const [noReviewsMessage, setNoReviewsMessage] = useState("");

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    axios
      .get(`${VEHICLE_PHOTO_URL}/sedan.jpg`)
      .then((response) => {
        setVehiclePhoto(response.data);

        return axios.get(`${VEHICLE_URL}/${id}`);
      })
      .then((secondResponse) => {
        setVehicle(secondResponse.data);
        setPrice((secondResponse.data.perdayrent * rentalDays))
        setSubtotal((secondResponse.data.perdayrent * rentalDays))

        return axios.get(`${VEHICLE_REVIEW_URL}/${id}`);
      })
      .then((thirdResponse) => {
        if (thirdResponse.data.length > 0) {
          setReviews(thirdResponse.data);
        } else {
          setNoReviewsMessage("No reviews to display at this time");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleConfirm = () => {
    setPrice(subtotal);
    setOpenModal(true);
  }

  return (
    <div className="userSearchVehicleContainer">
      <div className="leftSide">
        <div className="searchBackButtonContainer">
          <button className="returnButton" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faCircleArrowLeft} /> Go back
          </button>
        </div>
      </div>
      <div className="calendarContainer">
        <div className="rentalInfoContainer">
        <h2>Rental Period</h2>
        <p>
          Pickup: {format(dates[0].startDate, "EEEE")},{" "}
          {format(dates[0].startDate, "MMMM")},{" "}
          {format(dates[0].startDate, "d")}{" "}
        </p>
        <p>For {rentalDays} days </p>
        <p>Until</p>
        <p>
          Drop Off: {format(dates[0].endDate, "EEEE")},{" "}
          {format(dates[0].endDate, "MMMM")}, {format(dates[0].endDate, "d")}{" "}
        </p>
        <p>
          <span className="perdayPrice">Estimated subtotal: ${vehicle.perdayrent * rentalDays}</span>
        </p>
        </div>
        <div className="continueToCheckoutButtonContainer">
            <button onClick={handleConfirm} className="continueToCheckoutButton">Continue to Checkout</button>
        </div>
      </div>
      <div className="vehicleInfoContainer">
        <h1>{vehicle.name}</h1>
        <img src={vehiclePhoto} alt="" />
        <ul>
        <li>Vehicle Manufacturer: {vehicle.company}</li>
        <li>Cost per diem(base): {vehicle.perdayrent}</li>
        <li>Vehicle Class: {VEHICLE_TYPE_DICT[vehicle.vehicletypeid]}</li>
        </ul>
      </div>
      <div className="rightSide">
      <div className="reviewsContainer">
          <h3>Reviews of this Vehicle:</h3>
          {noReviewsMessage && <p>{noReviewsMessage}</p>}
          <ul>
            {reviews.map((review, key) => (
              <li key={review.reviewid} className="reviewListItem">
                <ul className="reviewInfoHeading">
                  <li>
                    {[...Array(parseInt(review?.stars))].map((item) => (
                      <FontAwesomeIcon icon={faStar} />
                    ))}{" "}
                    Stars
                  </li>
                  <li>
                    <strong>Comments:</strong> {review?.comments}
                  </li>
                </ul>
                <p>Written by {review.fullname}</p>
              </li>
            ))}
          </ul>
        </div>
      {openModal && <Checkout setOpen={setOpenModal} user={user} vehicleId={id} price={price} setPrice={setPrice} rentalDays={rentalDays} vehicleName={vehicle.name} subtotal={subtotal}/>}
      </div>
    </div>
  );
};

export default UserSearchVehicle;
