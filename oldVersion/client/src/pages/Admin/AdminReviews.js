import React from 'react'
import AdminNavBar from '../../components/NavBar/AdminNavBar'
import { useState, useEffect, useRef } from "react";
import {Link} from 'react-router-dom'
import axios from "../../api/axios";
import {useTable, useGlobalFilter, useSortBy, usePagination} from 'react-table';
import Snackbar from "../../components/Snackbar/Snackbar";
import {format} from 'date-fns';
import "./Admin.css";
import useAuth from "../../hooks/useAuth";
import GlobalFilter from "../../components/Filter/GlobalFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen} from "@fortawesome/free-solid-svg-icons";
const REVIEW_URL = "/review";

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);

  const [currRow, setCurrRow] = useState(0);

  const [reviewRemoved, setReviewRemoved] = useState(false);

  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState('');

  const [deleteErrorMessage, setDeleteErrorMessage] = useState('');

  useEffect(() => {
    axios
      .get(REVIEW_URL)
      .then((response) => {
        setReviews(response.data);
        console.log( "is response an array?" + Array.isArray(response.data))
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reviewRemoved]);

  const data = React.useMemo(() => reviews, [reviews]);

  const columns = React.useMemo(() => [
    {
      Header: "Review ID",
      accessor: "id"
    },
    {
      Header: "Date Posted",
      accessor: "createdAt",
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
      Header: "Comments",
      accessor: "comments"
    },
    {
      Header: "Stars",
      accessor: "stars"
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
      Header: "Booking ID",
      accessor: "bookingid"
    },
    {
      Header: "Pick Up",
      accessor: "bookingstart",
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
      accessor: "bookingend",
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
      Header: "Order uuid",
      accessor: "uuid"
    },
    
  ], []);

  const {getTableProps, getTableBodyProps, headerGroups, setGlobalFilter, page, nextPage, previousPage, canNextPage, canPreviousPage, pageOptions, state, setPageSize, prepareRow } = useTable({ columns, data, getRowId: (row) => row.id}, useGlobalFilter, useSortBy, usePagination)

  const { pageIndex, pageSize, globalFilter } = state;

  const handleRowClick = (id) => {
    setCurrRow(id);
    setReviewRemoved(false);
    
  }

  const handleDelete = (id) => {
    axios
      .delete(`${REVIEW_URL}/${id}`)
      .then((response) => {
        setReviewRemoved(true);
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
      .get(REVIEW_URL)
      .then((response) => {
        setReviews(response.data);
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
          
        <h1>Driven Auto Rental Reviews<FontAwesomeIcon icon={faPen}/></h1>
        
        </div>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
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
            {page.map((row) => {
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
        <div className='pageConfiguationContainer'>
          <select value={pageSize} onChange={(e) =>setPageSize(Number(e.target.value))}>
              {
                [5, 8, 10].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))
              }
          </select>
          <span>
            Page{" "} <strong> {pageIndex + 1} of {pageOptions.length}</strong>
          </span>
          <button className='previousPageButton' disabled={!canPreviousPage} onClick={() => previousPage()}>Previous</button>
          <button className='nextPageButton' disabled={!canNextPage} onClick={() => nextPage()}>Next</button>
        </div>

      </div>
    </>
  )
}

export default AdminReviews