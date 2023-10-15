import React from 'react'
import { Link} from 'react-router-dom';


const Header = () => {
  return (
    <>
    <header>
      <div className="title">
        <h1>Driven Car rental</h1>
      </div>
      <nav>
        <ul>
          <li className="navItem">
            
            <Link to="/login" >Login</Link>
              
          </li>
          <li className="navItem">
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
    </header>
    </>
  )
}

export default Header