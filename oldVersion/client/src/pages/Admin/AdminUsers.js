import React, { useState, useEffect, useRef } from "react";
import axios from "../../api/axios";
import AdminNavBar from "../../components/NavBar/AdminNavBar";
import {Link} from 'react-router-dom'
import {faPerson} from '@fortawesome/free-solid-svg-icons';
import fakeData from "../../MOCK_DATA.json";
import "./Admin.css";
import {useTable} from 'react-table';
import Snackbar from "../../components/Snackbar/Snackbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Register from '../Register';
const USER_URL = "/user";


const AdminUsers = () => {

  const createRef = useRef();

  const [users, setUsers] = useState([]);

  const [currRow, setCurrRow] = useState(0);

  const [acctAdded, setAcctAdded] = useState(true);

  const [acctRemoved, setAcctRemoved] = useState(false);

  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState('');

  const [deleteErrorMessage, setDeleteErrorMessage] = useState('');

  
 



  useEffect(() => {
    axios
      .get(USER_URL)
      .then((response) => {
        setUsers(response.data);
        // console.log( "is response an array?" + Array.isArray(response.data))
      })
      .catch((error) => {
        console.log(error);
      });
  }, [acctAdded, acctRemoved]);


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

 

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data, getRowId: (row) => row.id})


  const handleRowClick = (id) => {
    setCurrRow(id);
    setAcctRemoved(false);
  }
  

  const handleScrollCreate = () => {
    createRef.current?.scrollIntoView({behavior: 'smooth'})
  }

  const handleDelete = (id) => {
    axios
      .delete(`${USER_URL}/${id}`)
      .then((response) => {
        setAcctRemoved(true);
        setDeleteSuccessMessage(response.data.message);
        console.log(response)
      })
      .catch((error) => {
        setDeleteErrorMessage(error.response.data.message);
        console.log(error);
      });
  }

  return (

    <>
    <AdminNavBar/>
    {deleteSuccessMessage && <Snackbar type="success" message={deleteSuccessMessage}/>}
    {deleteErrorMessage && <Snackbar type="failure" message={deleteErrorMessage}/>}
      <div className="tableContainer">
        <div className="titleAndButton">
          
        <h1>Driven Auto Rental Accounts<FontAwesomeIcon icon={faPerson}/></h1>
        <button onClick={handleScrollCreate}>Create New User</button>
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
                
                <tr {...row.getRowProps()} id={row.id} >
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                    <td>
                      <input className="tableCheckBox" type="checkbox" checked={currRow === row.id ? true : false} onChange={() => handleRowClick(row.id)}/>
                    </td>
                  
                    <td className="buttonCell">
                  {<Link to={`/admin/users/${row.id}`}><button disabled={currRow === row.id ? false : true} id="detailsButton">Details</button></Link>}
                <button disabled={currRow === row.id ? false : true} id="deleteButton" onClick={() => handleDelete(row.id)}>Delete</button>
                </td>
                </tr>
                
                
                
              )
            })}

          </tbody>
        </table>

      </div>
            <div ref={createRef}>
            <Register admin={true} added={acctAdded} addedFunc={setAcctAdded}/>
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
