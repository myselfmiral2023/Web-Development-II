import React, { useContext, useEffect, useState } from 'react'
import "./Search.css"
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../contexts/SearchContext';
import { format } from 'date-fns';
import axios from '../api/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft} from "@fortawesome/free-solid-svg-icons";
const VEHICLE_AVAILABILITY_URL = "/vehicle/available";

const Search = () => {

   
    const navigate = useNavigate();

    const {dates} = useContext(SearchContext);


    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24
    
    const dayDifference = (date1, date2) => {

      try {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const dayDelta = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
        return dayDelta;
      } catch (error) {
        console.log(error);
      }
        
      
    }

    const rentalDays = dayDifference(dates[0]?.endDate, dates[0]?.startDate) + 1;


    const [vehicleUnits, setVehicleUnits] = useState([]);

    const [noAvailable, setNoAvailable] = useState(false);

    useEffect(() => {
      axios
      .get(`${VEHICLE_AVAILABILITY_URL}/${format(dates[0].startDate, "yyyy-MM-dd")}/${format(dates[0].startDate, "yyyy-MM-dd")}`)
      .then((response) => {
        if (response.data.length < 1){
          setNoAvailable(true);
        }else {
          setVehicleUnits(response.data);
        }
        
      }).catch((error) => {
        console.log(error);
      })
    }, [])

    const handleLearnMore = (id) => {
      navigate(`/search/${id}`);
    }

  return (
  <div className="searchContainer">
    <div className='searchBackButtonContainer'>

    <button className='returnButton' onClick={() => navigate("/")}><FontAwesomeIcon icon={faCircleArrowLeft}/> Go back</button>
    
    </div>
   
        <h1 className='searchTitle'>Search Results for a {rentalDays} day rental</h1>
        <h2 className="searchSubtitle">
          Our Vehicles available between <span className='titleDates'>{format(dates[0].startDate, "yyyy-MM-dd")}</span> and <span className='titleDates'>{format(dates[0].endDate, "yyyy-MM-dd")}</span>
        </h2>
        <div className="searchList">
          {vehicleUnits?.length ? (
            <div className="searchCard">
              <ul>
                {vehicleUnits.map((vehicleUnit, key) => (
                  <li key={vehicleUnit.id} className="searchListItem">
                    <ul className="vehicleInfoHeading">
                      <li>{vehicleUnit?.name}</li>
                      <li>{vehicleUnit?.company}</li>
                      <li>{vehicleUnit?.year}  {vehicleUnit?.typename}</li>
                    </ul>

                    <div className="searchListItemImage grow-rotate-on-hover">
                      <img
                        src={process.env.PUBLIC_URL + "/nissanMaxima.jpg"}
                        alt="car placeholder image"
                      />
                    </div>
                    <div className="searchListItemButtons">
                      <p>Estimated subtotal: <span id="perdayPrice">${(vehicleUnit.perdayrent) * rentalDays}</span> at ${vehicleUnit.perdayrent} per day</p>

                      <button onClick={() => handleLearnMore(vehicleUnit.id)}>Learn More</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            noAvailable ? <p>Sorry, there are no units available for this period</p> : <p>No vehicles to display (check your internet connection)</p>
          )}
        </div>
      </div>
    

  )
}

export default Search