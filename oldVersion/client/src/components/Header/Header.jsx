import {useState, useContext} from 'react'
import { Link, useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faTruck, faDollarSign, faCarSide, faCalendarDays, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import "./Header.css"
import {DateRange} from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from 'date-fns'
import { SearchContext } from '../../contexts/SearchContext';


const Header = () => {

  const navigate = useNavigate();

  const {dispatch} = useContext(SearchContext)

  const today = new Date();

    

    const [dates, setDates] = useState([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      }
    ])

    const [openDate, setOpenDate] = useState(false);

    const handleSearch = () => {
      dispatch({type: "NEW_SEARCH", payload: {dates}})
      navigate("/search", { state: {dates}})
  
    }

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
            <span onClick={() => openDate ? setOpenDate(false) : setOpenDate(true)}>{`${format(dates[0].startDate, "yyyy-MM-dd")} to ${format(dates[0].endDate, "yyyy-MM-dd")}`}</span>
            {openDate && <DateRange
              editableDateInputs={true}
              onChange={(item) => setDates([item.selection])}
              ranges={dates}
              className='date'
              
            />}
          </div>
          <div className="headerSearchItem">
            <span className="searchCalendarIcon" onClick={() => openDate ? setOpenDate(false) : setOpenDate(true)}><FontAwesomeIcon icon={faCalendarDays}/></span>
          </div>
          <div className="headerSearchItem">
            <Link to="/search"><button className="headerSearchButton" onClick={handleSearch}>Search</button></Link>
          </div>
        </div>
      </div>
    
  )
}

export default Header