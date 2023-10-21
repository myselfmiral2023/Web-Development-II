import React, {useState, useContext, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {format} from 'date-fns'
import "./Checkout.css";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Extras from "./Extras";
import Agreement from "./Agreement";
import { SearchContext } from "../../contexts/SearchContext";
const EXTRAS_VALUES = {
  "Satellite Radio": 35,
  "Roadside Assistance": 25,
  "Insurance": 85
}


const Checkout = ({ setOpen, vehicleId, vehicleName, price, setPrice, rentalDays, subtotal }) => {

  const {dates} = useContext(SearchContext)

  const [openExtras, setOpenExtras] = useState(true);

  const [openAgreement, setOpenAgreement] = useState(true);

  const [extrasArray, setExtrasArray] = useState([]);

  const [finalTotal, setFinalTotal] = useState(0);

  const [taxes, setTaxes] = useState(0);

  const handleExtrasReturn = () => {
    setExtrasArray([]);
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

  return (
    <div className="checkout">
      <div className="checkoutContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="checkoutClose"
          onClick={() => setOpen(false)}
        />
        {openExtras ? <Extras price={price} setPrice={setPrice} setExtrasArray={setExtrasArray} setOpenExtras={setOpenExtras} setOpenAgreement={setOpenAgreement} /> : <button className="extrasReturnButton" onClick={() => handleExtrasReturn()}>Extras</button>}
        {!openExtras && openAgreement && <Agreement setOpenAgreement={setOpenAgreement}/>}
        {!openExtras && !openAgreement && 
          <div className="checkoutEnd">
            <div className="checkoutEndContainer">
              <h1>Order Summary</h1>
              <p>Rental from {format(dates[0].startDate, "yyyy-MM-dd")} to {format(dates[0].endDate, "yyyy-MM-dd")}</p>
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
                <p>ORDER TOTAL: ${finalTotal}</p>
            </div>
          </div>
        
        }
      </div>
    </div>
  );
};

export default Checkout;
