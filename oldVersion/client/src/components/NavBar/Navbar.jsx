import { useContext, useState } from "react";
import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import useAuth from "../../hooks/useAuth";
import axios from '../../api/axios'
import Snackbar from "../Snackbar/Snackbar";
const LOGOUT_URL = '/user/logout';

function Navbar() {

  const [loggedOut, setLoggedOut] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  const {auth, setAuth} = useAuth();

  const { user, dispatch } = useContext(AuthContext);

  const handleLogout = async () => {
    
    
    try {
      const response = await axios.post(LOGOUT_URL,{}, 
      {
        withCredentials: true,
        
      })
      dispatch({type: "LOGOUT"})
      console.log(response);
      setLoggedOut(true);
      setAuth({});
      
      if (response.status === 200){
        setTimeout(() => {
          setLoggedOut(false);
          navigate("/login");
        }, 4000)
      }
  } catch (error) {
    if (error.response) {
        
          console.error(error.response.data);
          console.error(error.response.status);
          console.error(error.response.headers);
        } else {
          console.error(`Error: ${error.message}`);
        }
      }
      
  }

  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="brandLogo"><span style={{fontSize: "5rem", textDecoration: "none"}}>&#x2145;</span><span style={{textDecoration: "underline"}}>riven Auto Rental</span></span>
        {user ? (
          <>
            <div>
              {`Current User:  ${user.fullname}`}
              <br />
              { auth.role === "admin" ?
              <Link to="/admin/vehicles">
              <button className="profileButton" >&gt;Driven Administrator Navigation&lt;</button>
            </Link>
              : <Link to="/profile">
                <button className="profileButton" disabled={location.pathname == "/profile" ? true : false}>&gt;Visit Profile&lt;</button>
              </Link>}
            </div>
            <div>
              <button className="navButton" onClick={handleLogout}>Logout</button>
            </div>
          </>
        ) : (
          <div className="navItems">
            <Link to="/register">
              <button className="navButton">Register</button>
            </Link>

            <Link to="/login">
              <button className="navButton">Sign in</button>
            </Link>
          </div>
        )}
      </div>
      {loggedOut && <Snackbar type="success" message="You are now logged out."/>}
    </div>
  );
}

export default Navbar;
