import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRadio, faHeadset, faCarBurst } from "@fortawesome/free-solid-svg-icons";
import "./Checkout.css";

const Extras = ({ price, setPrice, setExtrasArray, setOpenExtras, setOpenAgreement}) => {
  const [extrasTotal, setExtrasTotal] = useState(0);

  const handleCheckboxChangeRadio = (e) => {
    const isChecked = e.target.checked;
    const extraCost = 35;

    if (isChecked) {
      setExtrasTotal((prevExtrasTotal) => prevExtrasTotal + extraCost);
      setExtrasArray((prevExtrasArray) => [...prevExtrasArray, "Satellite Radio"])
    } else {
      setExtrasTotal((prevExtrasTotal) => prevExtrasTotal - extraCost);
      setExtrasArray((prevExtrasArray) => prevExtrasArray.filter((item) => item !== "Satellite Radio"));
    }
  };
  const handleCheckboxChangeAssistance = (e) => {
    const isChecked = e.target.checked;
    const extraCost = 25;

    if (isChecked) {
      setExtrasTotal((prevExtrasTotal) => prevExtrasTotal + extraCost);
      setExtrasArray((prevExtrasArray) => [...prevExtrasArray, "Roadside Assistance"]);
    } else {
      setExtrasTotal((prevExtrasTotal) => prevExtrasTotal - extraCost);
      setExtrasArray((prevExtrasArray) => prevExtrasArray.filter((item) => item !== "Roadside Assistance"));
    }
  };
  const handleCheckboxChangeInsurance = (e) => {
    const isChecked = e.target.checked;
    const extraCost = 85;

    if (isChecked) {
      setExtrasTotal((prevExtrasTotal) => prevExtrasTotal + extraCost);
      setExtrasArray((prevExtrasArray) => [...prevExtrasArray, "Insurance"]);
    } else {
      setExtrasTotal((prevExtrasTotal) => prevExtrasTotal - extraCost);
      setExtrasArray((prevExtrasArray) => prevExtrasArray.filter((item) => item !== "Insurance"));
    }
  };

  const handleProceed = () => {
    setPrice((prevPrice) => prevPrice + extrasTotal);
    setOpenExtras(false);
    setOpenAgreement(true);
  }

  return (
    <div className="extras">
      <div className="extrasContainer">
        <h1>Please select your extras</h1>
        <div className="radioContainer">
          <div className="radioTitle">
            <input type="checkbox" onChange={handleCheckboxChangeRadio} />
            <h2><FontAwesomeIcon icon={faRadio}/>Satellite Radio</h2>
          </div>
          <ul>
            <li>
              <strong>Enhanced Entertainment Experience:</strong> Enjoy a wide
              array of channels, including music, sports, news, and more,
              ensuring a delightful journey for every passenger.
            </li>
            <li>
              <strong>No Interruptions or Dead Zones:</strong> Say goodbye to
              the frustration of losing radio signals in remote areas,
              guaranteeing uninterrupted entertainment and information
              throughout your entire trip.
            </li>
            <li>
              <strong>Personalized Listening:</strong> Tailor your journey with
              custom playlists, podcasts, and talk shows, allowing you to create
              the perfect atmosphere for an enjoyable and memorable drive.
            </li>
          </ul>
        </div>
        <div className="assistanceContainer">
          <div className="assistanceTitle">
            <input type="checkbox" onChange={handleCheckboxChangeAssistance} />
            <h2><FontAwesomeIcon icon={faHeadset}/>Roadside Assistance</h2>
          </div>
          <ul>
            <li>
              <strong>24/7 Peace of Mind:</strong> Travel with confidence, knowing that expert assistance is just a phone call away, ensuring quick and reliable support for any unexpected car-related emergencies.
            </li>
            <li>
              <strong>Convenience and Safety:</strong> Receive prompt aid for common issues such as flat tires, battery problems, or lockouts, allowing you to continue your journey smoothly and without unnecessary delays.
            </li>
            <li>
              <strong>Comprehensive Coverage:</strong> Benefit from a comprehensive package that includes towing services, fuel delivery, and other essential roadside assistance provisions, safeguarding you against any unforeseen travel disruptions.
            </li>
          </ul>
        </div>
        <div className="insuranceContainer">
          <div className="insuranceTitle">
            <input type="checkbox" onChange={handleCheckboxChangeInsurance} />
            <h2><FontAwesomeIcon icon={faCarBurst}/>Insurance for Car Rental</h2>
          </div>
          <ul>
            <li>
              <strong>Financial Protection:</strong>  Drive worry-free with comprehensive insurance coverage that shields you from the financial burden of unexpected accidents, damages, or theft, providing peace of mind throughout your rental period.
            </li>
            <li>
              <strong>Flexibility and Convenience:</strong> Enjoy the flexibility to explore new destinations and unfamiliar roads without concerns about potential damages, accidents, or liabilities, ensuring a stress-free and enjoyable travel experience.
            </li>
            <li>
              <strong>Rapid Claim Processing: </strong> Rest assured that in the event of an unfortunate incident, our streamlined claims process will ensure quick and efficient resolution, minimizing any inconvenience and allowing you to focus on your trip without unnecessary hassle or delays.
            </li>
          </ul>
        </div>
        <div className="extrasProceedButtonContainer">
        <button className="extrasProceedButton" onClick={handleProceed}>Proceed</button>
        </div>
      </div>
    </div>
  );
};

export default Extras;
