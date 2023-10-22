import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SearchContext } from "../contexts/SearchContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faStar } from "@fortawesome/free-solid-svg-icons";
import Checkout from "../components/Checkout/Checkout";
import axios from "../api/axios";
import "./UserSingleVehicle.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
const VEHICLE_URL = "/vehicle";
const VEHICLE_PHOTO_URL = "/vehicletype/files";
const VEHICLE_AVAILABILITY_URL = "/vehicle/available";
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

const UserSingleVehicle = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const { dispatch } = useContext(SearchContext);

  // try to implement it where the useContext of the SearchContext above grabs the 'dates' (change the dates,setDates usestate to avoid namecollison) variable as well, in case the date range was already set on the home page
  // before the user navigated here. but cannot seem to get the state manipulation done correctly, where the calendar range entered on the header/home autofills on this page...
  // const prevStart = dates[0]?.startDate ? dates[0]?.startDate : new Date();
  // const prevEnd = dates[0]?.endDate ? dates[0]?.endDate : new Date();

  const today = new Date();

  const [openModal, setOpenModal] = useState(false)

  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [price, setPrice] = useState(0);

  const [subtotal, setSubtotal] = useState(0);

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

  const [rentalDays, setRentalDays] = useState(0)

  // const rentalDays = dayDifference(dates[0]?.endDate, dates[0]?.startDate) + 1;

  useEffect(() => {
    const deltaStartEnd = dayDifference(dates[0]?.endDate, dates[0]?.startDate) + 1;
    setRentalDays(deltaStartEnd);
  }, [dates])

  useEffect(() => {
    const subCalc = rentalDays * vehicle.perdayrent;
    setSubtotal(subCalc);
    setPrice(subCalc);
  }, [rentalDays])

  const { id } = useParams();

  const [vehicle, setVehicle] = useState({});

  const [reviews, setReviews] = useState([]);

  const [noReviewsMessage, setNoReviewsMessage] = useState("");

  const [vehiclePhoto, setVehiclePhoto] = useState("");

  const [availabilitySearchMade, setAvailabilitySearchMade] = useState(false);

  const [available, setAvailable] = useState(false);

  const handleAvailabilitySearch = () => {
    axios
      .get(
        `${VEHICLE_AVAILABILITY_URL}/${format(
          dates[0].startDate,
          "yyyy-MM-dd"
        )}/${format(dates[0].startDate, "yyyy-MM-dd")}/12`
      )
      .then((response) => {
        setAvailabilitySearchMade(true);
        if (response.data.length < 1) {
          setAvailable(false);
        } else {
          setAvailable(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  useEffect(() => {
    axios
      .get(`${VEHICLE_PHOTO_URL}/sedan.jpg`)
      .then((response) => {
        setVehiclePhoto(response.data);

        return axios.get(`${VEHICLE_URL}/${id}`);
      })
      .then((secondResponse) => {
        setVehicle(secondResponse.data);

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

  const handleCheckout = () => {
    dispatch({type: "NEW_SEARCH", payload: {dates}})
    setOpenModal(true);
  }

  return (
    <div className="userSingleVehicleContainer">
      <div className="leftSide">
        <div className="calendarContainer">
          <div className="searchBackButtonContainer">
            <button className="returnButton" onClick={() => navigate(-1)}>
              <FontAwesomeIcon icon={faCircleArrowLeft} /> Go back
            </button>
          </div>
          <h2>Select Rental Period</h2>
          {
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setDates([item.selection])}
              ranges={dates}
              className="dateSingle"
              
            />
          }
          <button
            className="availabilityButton"
            onClick={handleAvailabilitySearch}
          >
            Check Availability
          </button>
          {availabilitySearchMade && available && (<div>
            <p>Vehicle is availble in this time period</p>
            <button className="continueToCheckoutButton" onClick={handleCheckout}>Rent this Vehicle</button>
            </div>
          )}
          {availabilitySearchMade && !available && (
            <p>Sorry, no availability in this date range.</p>
          )}
        </div>
      </div>
      <div className="vehicleInfoContainer">
        <h1>{vehicle.name}</h1>
        <img src={vehiclePhoto} alt="" />

        <p><strong>Manufacturer:</strong> {vehicle.company}</p>
        <p><strong>Cost per diem (base):</strong> {vehicle.perdayrent}</p>
        <p><strong>Vehicle Class :</strong> {VEHICLE_TYPE_DICT[vehicle.vehicletypeid]}</p>
        <p>{vehicle.year}</p>
        <br />
        <div className="subTotalContainer">
             <p>Estimated subtotal: ${isNaN(subtotal) ? "-" : subtotal}</p> 
        </div>
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
      </div>
      {openModal && <Checkout setOpen={setOpenModal} user={user} vehicleId={id} price={price} setPrice={setPrice} rentalDays={rentalDays} vehicleName={vehicle.name} subtotal={subtotal}/>}
    </div>
  );
};

export default UserSingleVehicle;
