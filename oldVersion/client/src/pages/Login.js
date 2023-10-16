import React from 'react'
import {useEffect, useState, useContext} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import "./Login.css"
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: undefined,
        password: undefined
    })

    const {loading, error, dispatch} = useContext(AuthContext)

    const [logEmail, setLogEmail] = useState('');
    const [logPass, setLogPass] = useState('');
    const [loginMsg, setLoginMsg] = useState('');
    const [loginStatus, setLoginStatus] = useState(false);
    const [errorStatus, setErrorStatus] = useState(false);

    const handleBlur = (e) => {
      setCredentials((prev) => ({...prev, [e.target.id]: e.target.value }));
      console.log(credentials);
      
    }

    const login = async () => {
      console.log(credentials);
      dispatch({type:"LOGIN_START"});
    
        try {
            const response = await axios.post('http://localhost:8080/api/user/login', credentials)
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
    <main>
    <div className="loginContainer" >
          <h1>Login</h1>
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" onChange={(e) => setLogEmail(e.target.value)} onBlur={handleBlur} />
          <label htmlFor="password">Password:</label>
          <input id="password" type="text" onChange={(e) => setLogPass(e.target.value)} onBlur={handleBlur} />
          <button disabled={loading} onClick={login} className='regLogButton'>Login</button>

          {loginStatus && (
            <h3>{loginMsg}</h3>
          )}
          {errorStatus && (
            <h3>{loginMsg}</h3>
          )}
    </div>
    </main>
  )

}
export default Login