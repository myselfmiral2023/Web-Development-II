import { useState, useEffect } from "react";
import axios from "../../api/axios";
import AdminNavBar from "../../components/NavBar/AdminNavBar";
import "./Admin.css";
const USER_URL = "/user";

const AdminUsers = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    axios
      .get(USER_URL)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (

    <>
    <AdminNavBar/>
    
    <article className="userList">
      Driven Auto Rental User Accounts
      <h2>Users List</h2>
      {users?.length ? (
        <div className="userCard">
          <ul>
            {users.map((user, key) => (
              <li key={user.id} className="userListItem">
                <div>
                  <ul>
                    <li>{user?.fullname}</li>
                    <li>{user?.email}</li>
                  </ul>
                </div>
                <div className="userListItemButtons">
                  <button>Update</button>
                  <button>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No users to display</p>
      )}
    </article>
    </>
  );
};

export default AdminUsers;
