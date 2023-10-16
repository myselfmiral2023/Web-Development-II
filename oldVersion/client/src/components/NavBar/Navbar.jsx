import {useContext} from "react";
import "./Navbar.css"
import {Link} from 'react-router-dom'
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {

  const {user} = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="brandLogo">Driven Auto Rental</span>
        {user ? "Current User: " + user.fullname 
        
        : <div className="navItems">
        <Link to="/register"><button className="navButton">Register</button></Link>
    
        <Link to="/login" ><button className="navButton">Sign in</button></Link>
        </div>}
      </div>
      
    </div>
  );
}

export default Navbar;
