import {useContext} from "react";
import "./Navbar.css"
import {Link} from 'react-router-dom'
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {

  const {user ,dispatch} = useContext(AuthContext);

  const handleLogout = async () => {
      dispatch({type: "LOGOUT"})
    try {
      const response = await axios.post('http://localhost:8080/api/user/logout')
      dispatch({type: "LOGIN_SUCCESS", payload: response.data})
      console.log(response);
      setLoginStatus(true);
      const fullName = response.data.fullname;
      setLoginMsg(`Welcome back ${fullName}`);
      if (response.status === 200){
        setTimeout(() => {
          navigate("/");
        }, 4000)
      }
  } catch (error) {
    setErrorStatus(true);
    dispatch({type: "LOGIN_FAILURE", payload: error.response.data})
      if (error.response) {
        setLoginMsg(error.response.data);
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
