import React from "react";
import axios from "../../api/axios";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { userSchema } from "../../validations/UserValidation";
import Snackbar from "../../components/Snackbar/Snackbar";
import "./Admin.css";
const USER_URL = "/user";
const USER_PHOTO_URL = "/user/files"

const AdminSingleUser = () => {
  const [user, setUser] = useState({});

  const [userPhoto, setUserPhoto] = useState('');

  const [editSelected, setEditSelected] = useState(false);

  const { id } = useParams();

  const [fullname, setFullName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  

  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleEditSubmit = async (e) => {
    e.preventDefault();


    try {
        let formData = {
            fullname: e.target[0].value,
            email: e.target[1].value,
            password: e.target[2].value
          };
          
          const isValid = await userSchema.isValid(formData); 

          if (isValid){
            const response = await axios.patch(`${USER_URL}/${id}`, {fullname, email, password} );


            console.log(response);
            if (response.status === 200){
                setSuccess(true);
                setSuccessMsg(response.data.message);
                setEditSelected(false);
            }
          }
    } catch (error) {
        if (!error?.response) {
            setErrMsg('No server response');
          } else {
            setError(true);
            setErrMsg(error.response.data);
          }
    }

    setEditSelected(false);
  }

  useEffect(() => {
  
    axios
      .get(`${USER_URL}/${id}`)
      .then((response) => {
        setUser(response.data);
        setFullName(response.data.fullname);
        setEmail(response.data.email);
        console.log(response);
        return axios.get(`${USER_PHOTO_URL}/userimg01.jpg`);
      })
      .then((response) => {
        console.log(`${USER_PHOTO_URL}/userimg01.jpg`);
        console.log(response);
        setUserPhoto(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [editSelected]);

  return (
    <>
    {success && <Snackbar type="success" message={successMsg}/>}
    {error && <Snackbar type="failure" message={errMsg}/>}
    <div>
      {editSelected ? (
        <section className="userEditFormContainer">
            <div>
            <h1>Edit User</h1>
            <button className="returnButton" onClick={() => setEditSelected(false)}>Cancel Edit</button>
            </div>
            <div className="userEditFormAndPhoto">
            <img className="userImageProfile" src={userPhoto} alt={`Profile photo for user ${user.id}`} />
            <form onSubmit={handleEditSubmit}>
          <label htmlFor="fullname">Full Name:</label>
          <input
            id="fullname"
            type="text"
            autoComplete="off"
            onChange={(e) => setFullName(e.target.value)}
            required
            placeholder="First and Last Name"
            value={fullname}
          />
          <label htmlFor="fullname">Email:</label>
          <input
            id="email"
            type="email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            value={email}
          />
          <label htmlFor="fullname">Password:</label>
          <input
            id="password"
            type="password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            value={password}
          />
          <button className="editButton">Update User</button>
          </form>
          
          </div>
        </section>
      ) : (
        <section className="userDetailDisplay">
            <Link to="/admin/users"><button className="returnButton">Return to Users Page</button></Link>
          <h1>Viewing User: {user.fullname}</h1>

          <ul>
            <li><img className="userImageProfile" src={userPhoto} alt={`Profile photo for user ${user.id}`} /></li>
            <li><span>Full Name:</span> {user.fullname}</li>
            <li><span>Email:</span> {user.email}</li>
            <li><span>Role:</span> {user.role}</li>
            <li>
              <span>Loyalty member:</span>{" "}
              {user.role === "admin"
                ? "admin"
                : user.isLoyalty === 1
                ? "Yes"
                : "No"}
            </li>
            <li>
              <span>reward Points:</span>{" "}
              {user.role === "admin"
                ? "admin"
                : user.isLoyalty === 1
                ? user.reward
                : "N/A"}
            </li>
          </ul>
          <button className="editButton" onClick={() => setEditSelected(true)}>Edit User</button>
        </section>
      )}
    </div>
    </>
  );
};

export default AdminSingleUser;
