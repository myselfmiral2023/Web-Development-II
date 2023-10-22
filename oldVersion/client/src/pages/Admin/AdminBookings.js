import React from 'react'
import AdminNavBar from '../../components/NavBar/AdminNavBar'
import { useState, useEffect, useRef } from "react";
import {Link} from 'react-router-dom'
import axios from "../../api/axios";
import {useTable, useSortBy, useGlobalFilter} from 'react-table';
import GlobalFilter from "../../components/Filter/GlobalFilter";
import Snackbar from "../../components/Snackbar/Snackbar";
import {format} from 'date-fns';
import "./Admin.css";
import useAuth from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faAngleDoubleUp, faAngleDoubleDown} from "@fortawesome/free-solid-svg-icons";
const BOOKING_URL = "/vehiclebooking";


const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  
  const {auth} = useAuth();

  const [currRow, setCurrRow] = useState(0);

  const [bookingRemoved, setBookingRemoved] = useState(false);

  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState('');

  const [deleteErrorMessage, setDeleteErrorMessage] = useState('');

  useEffect(() => {
    axios
      .get(BOOKING_URL)
      .then((response) => {
        setBookings(response.data);
        console.log( "is response an array?" + Array.isArray(response.data))
      })
      .catch((error) => {
        console.log(error);
      });
  }, [bookingRemoved]);

  const data = React.useMemo(() => bookings, [bookings]);

  const columns = React.useMemo(() => [
    {
      Header: "Booking ID",
      accessor: "id"
    },
    {
      Header: "Client ID",
      accessor: "userid"
    },
    {
      Header: "Client Name",
      accessor: "fullname"
    },
    {
      Header: "Vehicle ID",
      accessor: "vehicleid"
    },
    {
      Header: "Vehicle Unit Name",
      accessor: "name"
    },
    {
      Header: "Pick Up",
      accessor: "startdate",
      Cell: ({value}) => {
        if (!value) {
          return;
        }
        const date = new Date(value)
        
        const formattedDate = format(date, 'MM/dd/yyyy');
        
        return <span>{formattedDate}</span>;
        
      }
    },
    {
      Header: "Drop off",
      accessor: "enddate",
      Cell: ({value}) => {
        if (!value) {
          return;
        }
        const date = new Date(value)
        
        const formattedDate = format(date, 'MM/dd/yyyy');
        
        return <span>{formattedDate}</span>;
        
      }
    },
    {
      Header: "Ordered On",
      accessor: "bookingdate",
      Cell: ({value}) => {
        if (!value) {
          return;
        }
        const date = new Date(value)
        
        const formattedDate = format(date, 'MM/dd/yyyy');
        
        return <span>{formattedDate}</span>;
        
      }
    },
    {
      Header: "Booking Cost",
      accessor: "cost",
      Cell: ({value}) => {
        
        const formattedValue = parseInt(value).toFixed(2);
        
        return <span>{formattedValue}</span>;
      }
    },
    {
      Header: "Order uuid",
      accessor: "uuid"
    },
    
  ], []);

 

  const {getTableProps, getTableBodyProps, headerGroups, rows, state, setGlobalFilter, prepareRow } = useTable({ columns, data, getRowId: (row) => row.id}, useGlobalFilter, useSortBy)

  const {globalFilter} = state;

  const handleRowClick = (id) => {
    setCurrRow(id);
    setBookingRemoved(false);
    
  }

  const handleDelete = (id) => {
    axios
      .delete(`${BOOKING_URL}/${id}`)
      .then((response) => {
        setBookingRemoved(true);
        setDeleteSuccessMessage(response.data.message);
        console.log(response)
      })
      .catch((error) => {
        setDeleteErrorMessage(error.response.data);
        console.log(error);
      });
  }

  useEffect(() => {
    axios
      .get(BOOKING_URL)
      .then((response) => {
        console.log(response)
        setBookings(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
    <AdminNavBar/>
    {deleteSuccessMessage && <Snackbar type="success" message={deleteSuccessMessage}/>}
    {deleteErrorMessage && <Snackbar type="failure" message={deleteErrorMessage}/>}
    <div className="tableContainer">
        <div className="titleAndButton">
          
        <h1>Driven Auto Rental Bookings<FontAwesomeIcon icon={faBook}/></h1>
        
        </div>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) =>(
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {column.render("Header")}
                        <span>
                          {column.isSorted ? (column.isSortedDesc ? <FontAwesomeIcon icon={faAngleDoubleDown}/> : <FontAwesomeIcon icon={faAngleDoubleUp}/> ) : ""}
                        </span>
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
                  
                <button disabled={currRow === row.id ? false : true} id="deleteButton" onClick={() => handleDelete(row.id)}>Delete</button>
                </td>
                </tr>
                
                
                
              )
            })}

          </tbody>
        </table>

      </div>
    </>
  )
}

export default AdminBookings