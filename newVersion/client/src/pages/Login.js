import React from 'react'
import {useEffect, useState} from 'react'
import axios from 'axios';

const Login = () => {

    const [logEmail, setLogEmail] = useState('');
    const [logPass, setLogPass] = useState('');
    const [loginMsg, setLoginMsg] = useState('');
    const [loginStatus, setLoginStatus] = useState(false);

    const login = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/user/login', {email: logEmail, password: logPass})
            console.log(response);
            setLoginStatus(true);
            const fullName = response.data[0].fullName;
            setLoginMsg(`Welcome back ${fullName}`);
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
    <main>
    <div className="loginContainer" >
          <h1>Login</h1>
          <label htmlFor="logEmail">Email:</label>
          <input id="logEmail" type="email" onChange={(e) => setLogEmail(e.target.value)} />
          <label htmlFor="logPassword">Password:</label>
          <input id="logPassword" type="text" onChange={(e) => setLogPass(e.target.value)} />
          <button onClick={login}>Login</button>

          {loginStatus && (
            <div>{loginMsg}</div>
          )}
    </div>
    </main>
  )

}
export default Login