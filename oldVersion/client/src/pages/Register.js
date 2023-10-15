import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { userSchema } from "../validations/UserValidation";
import {Link} from 'react-router-dom';
import axios from '../api/axios'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{5,24}$/;

const REGISTER_URL = '/user/register'

const Register = () => {
  //YUP VALIDATION of email

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData = {
        email: e.target[1].value
      };
      const isValid = await userSchema.isValid(formData);
      console.log(isValid);
      if(isValid){
        console.log("valid credentials")
        try {
          const response = await axios.post('http://localhost:8080/api/user/register', {fullName: fullName, email: email, password: password})
          console.log(response.data)
          console.log(response.accessToken)
        } catch (error) {
          console.log(error);
          if (!error?.response) {
            setErrMsg('No server response');
          } else {
            setErrMsg('Registration Failed')
          }
        }

      }else {
        return;
      }
    } catch (error) {
      
    }
    
  };

 
  const nameRef = useRef();
  const errRef = useRef();

  const [fullName, setFullName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(fullName);
    console.log(result);
    console.log(fullName);
    setValidName(result);
  }, [fullName]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    console.log(result);
    console.log(password);
    setValidPassword(result);
  }, [password]);

  useEffect(() => {
    setErrMsg("");
  }, [fullName, password]);

  return (
    <section className="registrationContainer">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Registration</h1>
      <form onSubmit={handleSubmit} className="inputForm">
        <label htmlFor="regName">
          Full Name:
          <span className={validName ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validName || !fullName ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          id="regName"
          type="text"
          ref={nameRef}
          autoComplete="off"
          onChange={(e) => setFullName(e.target.value)}
          required
          onFocus={() => setNameFocus(true)}
          onBlur={() => setNameFocus(false)}
          placeholder="First and Last Name"
        />
        <label htmlFor="regEmail">Email:</label>
        <input id="regEmail" type="email" placeholder="example@mail.com" onChange={(e) => setEmail(e.target.value)}/>
        <label htmlFor="password">
          Password:
          <span className={validPassword ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validPassword || !password ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
          placeholder="Password"
        />
        <p id="passwordNote" className={passwordFocus && !validPassword ? "instructions" : "hide"}>
          <FontAwesomeIcon icon={faInfoCircle}/>
          5 to 24 characters. <br/>
          Must include uppercase and lowercase letters, and a number 
        </p>
        <button disabled={!validName || !validPassword ? true : false} className="regLogButton"> 
        Register
        </button>
      </form>
      <p>Already Registered?</p>
      <Link to="/login">Sign in</Link>
    </section>
  );
};

export default Register;
