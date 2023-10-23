import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { userSchema } from "../validations/UserValidation";
import {Link , useNavigate} from 'react-router-dom';
import axios from '../api/axios'
import Snackbar from "../components/Snackbar/Snackbar";
import "./Register.css"
const USER_PHOTO_UPLOAD_URL = "/user/upload"

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_\s]{3,28}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{5,24}$/;

const REGISTER_URL = '/user/register'

const Register = ({admin, added, addedFunc}) => {
  
  const navigate = useNavigate();

  // const [submitWasClicked, setSubmitWasClicked] = useState(false);

  const upload = async () => {
    try {
      const formData = new FormData();
      const newFileName = email + ".jpg";
  
      // Create a Blob with the desired name
      const blob = new Blob([file], { type: file.type });
      blob.name = newFileName;
  
      // Create a new File object from the Blob
      const renamedFile = new File([blob], newFileName, { type: file.type });
  
      formData.append("file", renamedFile);
      const res = await axios.post(USER_PHOTO_UPLOAD_URL, formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };


  const handleSubmit = async (e) => {
    console.log("Inside register handle");
    e.preventDefault();
    try {

      // let formData = {
      //   email: e.target[1].value
      // };
      // const isValid = await userSchema.isValid(formData); //YUP VALIDATION of email

      const isValid = true;
      if(isValid){
        console.log({fullname: fullname, email: email, password: password});
        var userToRegister = {fullname: fullname, email: email, password: password};
        try {
          //const response = await axios.post('http://localhost:8080/api/user/register', {fullname: fullname, email: email, password: password})
          const response = await axios.post(REGISTER_URL, userToRegister);

          //upload image when user created successfully
          if (response.status == 201){
            const imgUrl = await upload();
          }
          
          if (response.status === 201 && !admin){
            setSuccess(true);
            console.log(response);
            setSuccessMsg(response.data.message)
            setTimeout(() => {
              // navigate("/login");
            }, 2000)
          }else {
            setSuccess(true);
            setSuccessMsg(response.data.message)
          }
          
        } catch (error) {
          console.log("Error-------------");
          console.log(error);
          if (!error?.response) {
            setErrMsg('No server response');
          } else {
            setError(true);
            setErrMsg(error.response.data);
          }
        }

      }else {
        console.log("In the ELse part");
        return;
      }
    } catch (error) {
      console.log(error)
    }
    // addedFunc(!added);
    // setSubmitWasClicked(true);
    setFullname("");
    setEmail("");
    setPassword("");
    setMatchPwd("");
  };

 
  const nameRef = useRef();
  const errRef = useRef();

  

  const [fullname, setFullname] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  //File code starts
  const [file, setFile] = useState(null);
  

  //file code ends

  useEffect(() => {
    nameRef.current.focus();
  }, []);
  useEffect(() => {
    setFullname("");
    setEmail("");
    setPassword("");
    setMatchPwd("");
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(fullname);
    
    setValidName(result);
  }, [fullname]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
   
    setValidPassword(result);
    setValidMatch(password === matchPwd)
  }, [password, matchPwd]);


  useEffect(() => {
    setErrMsg("");
  }, [fullname, password]);

  return (
    <section className="registrationContainer">
      {/* <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p> */}
      <h1>{admin ? "Create a New Driven User" : "Registration"}</h1>
      <form onSubmit={handleSubmit} className="inputForm">
        <label htmlFor="regName">
          Full Name:
          <span className={validName ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validName || !fullname ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          id="regName"
          type="text"
          ref={nameRef}
          autoComplete="off"
          onChange={(e) => setFullname(e.target.value)}
          required
          onFocus={() => setNameFocus(true)}
          onBlur={() => setNameFocus(false)}
          placeholder="First and Last Name"
          value={fullname}
        />
        <label htmlFor="regEmail">Email:</label>
        <input id="regEmail" type="email" placeholder="example@mail.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
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
          value={password}
        />
        <p id="passwordNote" className={passwordFocus && !validPassword ? "instructions" : "hide"}>
          <FontAwesomeIcon icon={faInfoCircle}/>
          5 to 24 characters. <br/>
          Must include uppercase and lowercase letters, and a number 
        </p>
        <label htmlFor="passwordMatch">
          Password Confirm:
        <FontAwesomeIcon icon={faCheck}  className={validMatch && matchPwd ? "valid" : "hide"}/>
        <FontAwesomeIcon icon={faTimes}  className={validMatch || !matchPwd ? "hide" : "invalid"}/>
        </label>
        <input id="passwordMatch" type="password" required onChange={(e) => setMatchPwd(e.target.value)} onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)} value={matchPwd} placeholder="Password Confirm"/>
          <p id="passwordMatchNote" className={matchFocus && !validMatch ? "instructions" : "hide"}>
          <FontAwesomeIcon icon={faInfoCircle}/>
          Password and password confirms fields do not match. 
        </p>
        <label className="file" htmlFor="file">
            Upload Image
        </label>
        <input
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          
        <button disabled={!validName || !validPassword || !validMatch ? true : false} onClick={handleSubmit} className="regLogButton"> 
        {/* <button onClick={handleSubmit} className="regLogButton">  */}
        Register
        </button>
      </form>
      {success && <Snackbar type="success" message={successMsg}/>}
      {error && <Snackbar type="failure" message={errMsg}/>}
      {admin ? "" : <><p>Already Registered?</p> <Link to="/login">Sign in</Link> </>}
    </section>
  );
};

export default Register;
