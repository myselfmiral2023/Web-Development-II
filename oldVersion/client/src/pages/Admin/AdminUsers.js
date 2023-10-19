import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import AdminNavBar from "../../components/NavBar/AdminNavBar";
import {Link} from 'react-router-dom'
import fakeData from "../../MOCK_DATA.json";
import "./Admin.css";
import {useTable} from 'react-table';
const USER_URL = "/user";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  console.log("before useEffect")
  console.log(users);

  useEffect(() => {
    axios
      .get(USER_URL)
      .then((response) => {
        setUsers(response.data);
        console.log( "is response an array?" + Array.isArray(response.data))
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log("after useEffect");
  console.log(users);

  // const columns = React.useMemo(
  //   () => [
  //     {
  //       Header: "ID",
  //       accessor: "id",
  //     },
  //     {
  //       Header: "First Name",
  //       accessor: "first_name",
  //     },
  //     {
  //       Header: "Last Name",
  //       accessor: "last_name",
  //     },
  //     {
  //       Header: "Email",
  //       accessor: "email",
  //     },
  //     {
  //       Header: "Gender",
  //       accessor: "gender",
  //     },
  //     {
  //       Header: "University",
  //       accessor: "university",
  //     },
  //   ],
  //   []
  // );

  const data = React.useMemo(() => users, [users]);

  const columns = React.useMemo(() => [
    {
      Header: "ID",
      accessor: "id"
    },
    {
      Header: "Name",
      accessor: "fullname"
    },
    {
      Header: "Email",
      accessor: "email"
    }
  ], []);

 

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({ columns, data})

  





  return (

    <>
    <AdminNavBar/>
      <div className="tableContainer">
        <div className="titleAndButton">
        <h1>Driven Auto Rental Accounts</h1>
        <Link to="/register"><button>Create New User</button></Link>
        </div>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) =>(
                    <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                    </th>
                  ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row)
              return (
                
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                  
                    <td className="buttonCell">
                  <button id="detailsButton">Details</button>
                <button id="deleteButton">Delete</button>
                </td>
                </tr>
                
                
                
              )
            })}

          </tbody>
        </table>

      </div>


    
    {/* <article className="userList">
      Driven Auto Rental User Accounts
      <h2 >Users List</h2>
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
    </article> */}
    </>
  );
};

export default AdminUsers;
