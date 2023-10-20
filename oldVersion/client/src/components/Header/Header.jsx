import {useState, useContext} from 'react'
import { Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faTruck, faDollarSign, faCarSide, faCalendarDays, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import "./Header.css"
import {DateRange} from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from 'date-fns'
import { SearchContext } from '../../contexts/SearchContext';


const Header = () => {

  const {dispatch} = useContext(SearchContext)

  const handleSearch = () => {
    // dispatch({type: "NEW_SEARCH", payload})

  }

    const [date, setDate] = useState([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      }
    ])

    const [openDate, setOpenDate] = useState(false);

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
            <span onClick={() => openDate ? setOpenDate(false) : setOpenDate(true)}>{`${format(date[0].startDate, "yyyy/MM/dd")} to ${format(date[0].endDate, "yyyy/MM/dd")}`}</span>
            {openDate && <DateRange
              editableDateInputs={true}
              onChange={(item) => setDate([item.selection])}
              ranges={date}
              className='date'
            />}
          </div>
          <div className="headerSearchItem">
            <span className="searchCalendarIcon" onClick={() => openDate ? setOpenDate(false) : setOpenDate(true)}><FontAwesomeIcon icon={faCalendarDays}/></span>
          </div>
          <div className="headerSearchItem">
            <button className="headerSearchButton">Search</button>
          </div>
        </div>
      </div>
    
  )
}

export default Header