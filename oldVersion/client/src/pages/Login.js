import React from 'react'
import {useEffect, useState, useContext, useRef} from 'react'
import axios from '../api/axios'
import {useNavigate} from 'react-router-dom';
import "./Login.css"
import { AuthContext } from '../contexts/AuthContext';
import Snackbar from '../components/Snackbar/Snackbar';

const LOGIN_URL = '/user/login';


const Login = () => {
    const navigate = useNavigate();

    // const snackbarRef = useRef(null);

    const [credentials, setCredentials] = useState({
        email: undefined,
        password: undefined
    })

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
      console.log(credentials);
      dispatch({type:"LOGIN_START"});
    
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
            // if (response.status === 200){
            //   setTimeout(() => {
            //     navigate("/");
            //   }, 4000)
            // }
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
            
            
        }
    

  return (
    <main>
    <div className="loginContainer" >
          <h1>Login</h1>
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" onChange={(e) => setLogEmail(e.target.value)} onBlur={handleBlur} />
          <label htmlFor="password">Password:</label>
          <input id="password" type="text" onChange={(e) => setLogPass(e.target.value)} onBlur={handleBlur} />
          <button disabled={loading} onClick={login} className='regLogButton'>Login</button>

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