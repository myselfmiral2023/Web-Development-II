import React, {useState, useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {format} from 'date-fns'
import "./Checkout.css";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Extras from "./Extras";
import Agreement from "./Agreement";
import { SearchContext } from "../../contexts/SearchContext";
import axios from "../../api/axios";
const BOOKING_URL = "/vehiclebooking"
const EXTRAS_VALUES = {
  "Satellite Radio": 35,
  "Roadside Assistance": 25,
  "Insurance": 85
}


const Checkout = ({ setOpen, user, vehicleId, vehicleName, price, setPrice, rentalDays, subtotal }) => {

  let navigate = useNavigate();

  const {dates} = useContext(SearchContext)

  const startDateFormatted = format(dates[0].startDate, "yyyy-MM-dd");

  const endDateFormatted = format(dates[0].endDate, "yyyy-MM-dd");

  const [openExtras, setOpenExtras] = useState(true);

  const [orderSuccess, setOrderSuccess] = useState(false);

  const [isCloseable, setIsCloseable] = useState(true);

  const [orderFailure, setOrderFailure] = useState(false);

  const [confirmation, setConfirmation] = useState("");

  const [errMessage, setErrorMessage] = useState("");

  const [openAgreement, setOpenAgreement] = useState(true);

  const [extrasArray, setExtrasArray] = useState([]);

  const [finalTotal, setFinalTotal] = useState(0);

  const [taxes, setTaxes] = useState(0);

  const handleExtrasReturn = () => {
    setExtrasArray([]);
    setPrice(subtotal);
    setOpenAgreement(false);
    setOpenExtras(true);
  }

  useEffect(() => {
    const taxCalc = (price * .15).toFixed(2);

    setTaxes(taxCalc);

    const bottomLine = (parseFloat(price) + parseFloat(taxCalc)).toFixed(2);

    setFinalTotal(bottomLine);

  }, [price])

  useEffect(() => {
    console.log(extrasArray)
  }, [extrasArray, openAgreement])

  const handleClose = () => {
    setExtrasArray([]);
    setPrice(0);
    setOpen(false);
  }

  const handleConfirmBooking = () => {
    axios
        .post(BOOKING_URL, {userid: user.id, vehicleid: vehicleId, startdate: startDateFormatted, enddate: endDateFormatted, bookingdate: format(new Date(), "yyyy-MM-dd"), cost:finalTotal })
        .then((response) => {
            if (response.status === 201){
                setOrderSuccess(true);
                setConfirmation(response.data.uuid)
                setIsCloseable(false);
            } else {
              console.log(response)
            }
        }).catch((error => {
          setOrderFailure(true);
          console.log(error);
          setErrorMessage("An error occurred while attempting to complete your booking. Please close this window and try again.")

        }))
  }

  return (
    <div className="checkout">
      <div className="checkoutContainer">
      {isCloseable && <FontAwesomeIcon
          icon={faCircleXmark}
          className="checkoutClose"
          onClick={handleClose}
        />}
        {openExtras ? <Extras price={price} setPrice={setPrice} setExtrasArray={setExtrasArray} setOpenExtras={setOpenExtras} setOpenAgreement={setOpenAgreement} /> : isCloseable && <button className="extrasReturnButton" onClick={() => handleExtrasReturn()}>Extras</button>}
        {!openExtras && openAgreement && <Agreement setOpenAgreement={setOpenAgreement}/>}
        {!openExtras && !openAgreement && !orderSuccess && !orderFailure &&
          <div className="checkoutEnd">
            <div className="checkoutEndContainer">
              <h1>Order Summary</h1>
              <p>Rental from {startDateFormatted} to {endDateFormatted}</p>
                <ul>
                  <li>A {rentalDays} day rental of a {vehicleName}: ${subtotal}</li>
                 {extrasArray.length < 1 ? ""
                   : 
                    extrasArray.map((item) => {
                      return <li key={item}>{item} : ${EXTRAS_VALUES[item]}</li>
                    })
                   }
                   <li>Taxes: {taxes}</li>
                </ul>
                <hr />
                <p>ORDER TOTAL: ${finalTotal}</p>
                <button onClick={handleConfirmBooking} className="confirmBookingButton">
                  CONFIRM BOOKING
                </button>
            </div>
          </div>
        
        }
        {orderSuccess && 
          <div className="checkoutConfirm">
            <h1>Your booking is confirmed</h1>
            <p >Your order confirmation number is :</p>
            <p className="confirmationNumber">{confirmation}</p>
            <button onClick={() => navigate("/")} className="bookMoreRentalsButton">Book More Rentals</button>
            <button onClick={() => navigate("/profile")} className="returnToProfileButton">Return to My Profile</button>
          </div>
        }
        {orderFailure && 
          <div className="checkoutConfirm">
            <h1>Something went wrong.</h1>
            <p>{errMessage}</p>
          </div>
        }
      </div>
    </div>
  );
};

export default Checkout;
