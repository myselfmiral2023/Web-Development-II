import React from 'react'
import { Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faTruck, faDollarSign, faCarSide, faCalendarDays, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import "./Header.css"


const Header = () => {
  return (
      <div className="headerContainer">
        <div className="headerList">
        
          <div className="headerListItem">
            <div>
            <FontAwesomeIcon icon={faCar}/>
            <span>Autos</span>
            </div>
            <div>
            <FontAwesomeIcon icon={faTruck} />
            <span>Trucks</span>
            </div>
            <div>
            <FontAwesomeIcon icon={faDollarSign} />
            <span>Affordable</span>
            </div>
          </div>
          
        </div>
        <h1 className='headerTitle'>Here when you need wheels <span className='headerTitleIcon'><FontAwesomeIcon icon={faCarSide} /></span>. Search Driven Auto Deals today.</h1>
        <div className="headerSearch">
          <div className="headerSearchItem">
            <span>Please Select your Pick-up/Drop-off dates:</span>
          </div>
          <div className="headerSearchItem">
            <span><FontAwesomeIcon icon={faArrowRight}/></span>
          </div>
          <div className="headerSearchItem">
            <span><FontAwesomeIcon icon={faCalendarDays}/></span>
          </div>
          <div className="headerSearchItem">
            <button className="headerSearchButton">Search</button>
          </div>
        </div>
      </div>
    
  )
}

export default Header