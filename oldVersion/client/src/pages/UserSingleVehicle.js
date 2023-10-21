import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SearchContext } from '../contexts/SearchContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft} from "@fortawesome/free-solid-svg-icons";
import axios from "../api/axios";
import "./UserSingleVehicle.css";
import {DateRange} from 'react-date-range';
import {format} from 'date-fns'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
const VEHICLE_URL = "/vehicle";
const VEHICLE_PHOTO_URL = "/vehicletype/files";
const VEHICLE_AVAILABILITY_URL = "/vehicle/available";

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

  const navigate = useNavigate();

  const {dispatch} = useContext(SearchContext);
  
  // try to implement it where the useContext of the SearchContext above grabs the 'dates' (change the dates,setDates usestate to avoid namecollison) variable as well, in case the date range was already set on the home page
  // before the user navigated here. but cannot seem to get the state manipulation done correctly, where the calendar range entered on the header/home autofills on this page...
  // const prevStart = dates[0]?.startDate ? dates[0]?.startDate : new Date();
  // const prevEnd = dates[0]?.endDate ? dates[0]?.endDate : new Date();

  const today = new Date();

  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ])

  

  const { id } = useParams();

  const [vehicle, setVehicle] = useState({});

  const [vehiclePhoto, setVehiclePhoto] = useState("");

  const [availabilitySearchMade, setAvailabilitySearchMade] = useState(false);

  const [available, setAvailable] = useState(false);

  const handleAvailabilitySearch = () => {
    
      axios
          .get(`${VEHICLE_AVAILABILITY_URL}/${format(dates[0].startDate, "yyyy-MM-dd")}/${format(dates[0].startDate, "yyyy-MM-dd")}/12`)
          .then((response) => {
            
            setAvailabilitySearchMade(true);
            if (response.data.length < 1){
              setAvailable(false)
            }else {
              setAvailable(true);
            }
          }).catch((error) => {
            console.log(error);
          })
  }


  useEffect(() => {
    axios
      .get(`${VEHICLE_PHOTO_URL}/sedan.jpg`)
      .then((response) => {
        setVehiclePhoto(response.data);

        return axios.get(`${VEHICLE_URL}/${id}`);
      })
      .then((secondResponse) => {
        setVehicle(secondResponse.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="userSingleVehicleContainer">
      <div className="leftSide">

      </div>
      <div className="calendarContainer">
      <div className='searchBackButtonContainer'>

<button className='returnButton' onClick={() => navigate(-1)}><FontAwesomeIcon icon={faCircleArrowLeft}/> Go back</button>

</div>
        <h2>Select Rental Period</h2>
      {<DateRange
              editableDateInputs={true}
              onChange={(item) => setDates([item.selection])}
              ranges={dates}
              className='dateSingle'
              minDate={today}
            />}
          <button className="availabilityButton" onClick={handleAvailabilitySearch}>Check Availability</button>  
          {availabilitySearchMade && available && <p>Vehicle is availble in this time period</p>}
          {availabilitySearchMade && !available && <p>Sorry, no availability in this date range.</p>}
      </div>
      <div className="vehicleInfoContainer">
        <h1>{vehicle.name}</h1>
        <img src={vehiclePhoto} alt="" />

        <p>{vehicle.company}</p>
        <p>{vehicle.perdayrent}</p>
        <p>{VEHICLE_TYPE_DICT[vehicle.vehicletypeid]}</p>
        <p>{vehicle.year}</p>
      </div>
      <div className="rightSide">

      </div>
    </div>
  );
};

export default UserSingleVehicle;
