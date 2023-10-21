import React from 'react'
import {useEffect, useState, useContext, useRef} from 'react'
import axios from '../api/axios'
import {useNavigate, useLocation, Link} from 'react-router-dom';
import "./Login.css"
import { AuthContext } from '../contexts/AuthContext';
import useAuth from '../hooks/useAuth'
import Snackbar from '../components/Snackbar/Snackbar';


const LOGIN_URL = '/user/login';


const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    // const snackbarRef = useRef(null);

    const [credentials, setCredentials] = useState({
        email: undefined,
        password: undefined
    })

    const {auth, setAuth} = useAuth();

    const {loading, error, dispatch} = useContext(AuthContext)

    const [logEmail, setLogEmail] = useState('');
    const [logPass, setLogPass] = useState('');
    const [loginStatus, setLoginStatus] = useState(false);
    
   
    
    const [errorMsg, setErrorMsg] = useState('');
    const [errorStatus, setErrorStatus] = useState(false);

    const handleBlur = (e) => {
      setCredentials((prev) => ({...prev, [e.target.id]: e.target.value }));
      console.log(credentials);
      
    }

    const login = async () => {
      
      // console.log("AUTH before login")
      // for (const [key, value] of Object.entries(auth)){
      //   console.log(`${key}: ${value}`)
      // }

      dispatch({type:"LOGIN_START"});

      if(!logPass || !logEmail){
        setErrorStatus(true);
        setErrorMsg("Please complete all fields");
        return;
      }
    
        try {
            const response = await axios.post(LOGIN_URL, credentials, 
            {
              headers: {'Content-Type' : 'application/json'},
              withCredentials: true
            })
            setErrorStatus(false);
            dispatch({type: "LOGIN_SUCCESS", payload: response.data})
            console.log(response);
            setLoginStatus(true);
            const fullName = response.data.fullname;
            console.log(fullName);
            const role = response.data.role;
            console.log(role);
            console.log("is role === 'admin' ?" + (role === "admin") )
            const access_token = response.data.token;
            axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
            // console.log(access_token);
            setAuth({user: logEmail, logPass, role, access_token});
            if (response.status === 200){
              console.log("is role === 'admin' ?" + (role === "admin") )
              if (role === "admin"){
                setTimeout(() => {
                  navigate("/admin/users");
                }, 4000)
              } else {
              
              setTimeout(() => {
                navigate(from, {replace: true});
              }, 4000)
            }
            }
        } catch (error) {
          console.log(error)
          setErrorStatus(true);
          
            if (error.response) {
              dispatch({type: "LOGIN_FAILURE", payload: error.response.data})
              setErrorMsg(error.response.data);
                console.error(error.response.data);
                console.error(error.response.status);
                console.error(error.response.headers);
              } else {
                dispatch({type: "LOGIN_FAILURE", payload: "Network Error"})
                setErrorMsg(error.message);
                console.error(`Error: ${error.message}`);
              }
            }
            setLogEmail('');
            setLogPass('');
    
        }

        

        
    

  return (
    <main>
    <div className="loginContainer" >
          <h1>Login</h1>
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" required onChange={(e) => setLogEmail(e.target.value)} onBlur={handleBlur} value={logEmail} />
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" required onChange={(e) => setLogPass(e.target.value)} onBlur={handleBlur} value={logPass}/>
          <button disabled={loading} onClick={login} className='regLogButton'>Login</button>
          <br />
          <p>Don't have an account yet? Register Today:</p>
          <Link to="/register">Register</Link>
          

          {loginStatus && (
            <>
            
            <Snackbar type="success" message="Success! You are now logged in."/>
            </>
          )}
          {errorStatus && (
            <Snackbar type="failure" message={errorMsg}/>
          )}
    </div>
    </main>
  )

}
export default Login