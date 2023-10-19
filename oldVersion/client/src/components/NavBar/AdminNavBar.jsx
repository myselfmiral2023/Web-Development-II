import React from 'react'
import "./Navbar.css"
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGhost } from '@fortawesome/free-solid-svg-icons'

const AdminNavBar = () => {
  return (
    <>
    <h1 className='adminNavBarTitle'><span className='halloween'><FontAwesomeIcon icon={faGhost}/></span> Driven Administrator Navigation <span className='halloween'><FontAwesomeIcon icon={faGhost}/></span></h1>
    <div className='adminNavBarContainer'>
    
    <Link to="/admin/users"><div className='adminNavBarItem'>Users</div></Link> 
    <Link to="/admin/data"><div className='adminNavBarItem'>Charts</div></Link>                     
    <Link to="/admin/reviews"><div className='adminNavBarItem'>Reviews</div></Link>                     
    <Link to="/admin/bookings"><div className='adminNavBarItem'>Bookings</div></Link>
    <Link to="/admin/vehicles"><div className='adminNavBarItem'>Vehicles</div></Link>
    </div>
    </>
  )
}

export default AdminNavBar