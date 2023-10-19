import React from 'react'
import AdminNavBar from '../../components/NavBar/AdminNavBar'
import { useState, useEffect, useRef } from "react";
import {Link} from 'react-router-dom'
import axios from "../../api/axios";
import {useTable} from 'react-table';
import Snackbar from "../../components/Snackbar/Snackbar";
import "./Admin.css";
import useAuth from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar} from "@fortawesome/free-solid-svg-icons";
const VEHICLE_URL = "/vehicle";

const AdminVehicles = () => {
  const createRef = useRef();

  const [vehicles, setVehicles] = useState([]);

  const [currRow, setCurrRow] = useState(0);

  const [vehicleAdded, setVehicleAdded] = useState(false);

  const [vehicleRemoved, setVehicleRemoved] = useState(false);

  const [addedSuccessMessage, setAddedSuccessMessage] = useState('');

  const [addedErrorMessage, setAddedErrorMessage] = useState('');

  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState('');

  const [deleteErrorMessage, setDeleteErrorMessage] = useState('');

  const [newVehicleName, setNewVehicleName] = useState('');
  const [newVehicleCompany, setNewVehicleCompany] = useState('');
  const [newVehiclePrice, setNewVehiclePrice] = useState(0);
  const [newVehicleType, setNewVehicleType] = useState('');
 



  useEffect(() => {
    axios
      .get(VEHICLE_URL)
      .then((response) => {
        setVehicles(response.data);
        console.log( "is response an array?" + Array.isArray(response.data))
      })
      .catch((error) => {
        console.log(error);
      });
  }, [vehicleAdded, vehicleRemoved]);


  const data = React.useMemo(() => vehicles, [vehicles]);

  const columns = React.useMemo(() => [
    {
      Header: "ID",
      accessor: "id"
    },
    {
      Header: "Unit Name",
      accessor: "name"
    },
    {
      Header: "Manufacturer",
      accessor: "company"
    },
    {
      Header: "Cost Per Day",
      accessor: "perdayrent",
      Cell: ({value}) => {
        
        const formattedValue = parseInt(value).toFixed(2);
        
        return <span>{formattedValue}</span>;
      }
    },
    {
      Header: "Unit Type",
      accessor: "typename"
    },
    {
      Header: "Unit Edition",
      accessor: "year"
    },
    {
      Header: "Added to Fleet",
      accessor: "createdAt"
    },
  ], []);

 

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data, getRowId: (row) => row.id})


  const handleRowClick = (id) => {
    setCurrRow(id);
    setVehicleRemoved(false);
    setVehicleAdded(false);
  }
  

  const handleScrollCreate = () => {
    createRef.current?.scrollIntoView({behavior: 'smooth'})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newVehicleName || !newVehicleCompany || !newVehiclePrice || !newVehicleType) {
        setAddedErrorMessage("Please fill out all fields.")
        
    }
    const newVehicle = {name: newVehicleName, company: newVehicleCompany , perdayrent: newVehiclePrice , vehicletypeid: newVehicleType };
    console.log(newVehicle);

    try {
        const response = await axios.post(`${VEHICLE_URL}`, newVehicle);
        console.log(response);
        if (response.status === 201){
          setAddedSuccessMessage("New Vehicle has been added")
          setVehicleAdded(true);
        }

    } catch (error) {
      console.log(error);
      setAddedErrorMessage(error.message)
    }
      setNewVehicleName('')
      setNewVehicleCompany('')
      setNewVehiclePrice(0)
      setNewVehicleType('')
  }

  const handleDelete = (id) => {
    axios
      .delete(`${VEHICLE_URL}/${id}`)
      .then((response) => {
        setVehicleRemoved(true);
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
      .get(VEHICLE_URL)
      .then((response) => {
        setVehicles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
    <AdminNavBar/>
    {addedSuccessMessage && <Snackbar type="success" message={addedSuccessMessage}/>}
    {addedErrorMessage && <Snackbar type="failure" message={addedErrorMessage}/>}
    {deleteSuccessMessage && <Snackbar type="success" message={deleteSuccessMessage}/>}
    {deleteErrorMessage && <Snackbar type="failure" message={deleteErrorMessage}/>}
      <div className="tableContainer">
        <div className="titleAndButton">
          
        <h1>Driven Auto Rental Vehicle Units<FontAwesomeIcon icon={faCar}/></h1>
        <button onClick={handleScrollCreate}>Add A New Unit to Fleet</button>
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
      <div className="addVehicleContainer" ref={createRef}>
        <h1>Add a New Unit</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="unitName">Unit Name:</label>
            <input type="text" id="unitName" required value={newVehicleName} placeholder='New Unit Name' onChange={(e) => setNewVehicleName(e.target.value)}/>
            <label htmlFor="unitCompany">Manufacturer:</label>
            <input type="text" id="unitCompany" required value={newVehicleCompany} placeholder='Manufacturer' onChange={(e) => setNewVehicleCompany(e.target.value)}/>
            <label htmlFor="costPerDay">Daily Price (rounded to nearest dollar):</label>
            <input type="number" id="costPerDay" required value={newVehiclePrice} placeholder='Price (rounded)' onChange={(e) => setNewVehiclePrice(e.target.value)}/>
            <label htmlFor="browser">New Unit Type:</label>
            <input list='types' id="typeInput" value={newVehicleType} required onChange={(e) => setNewVehicleType(e.target.value)}/>
            <datalist id='types'>
              <option value="1">SUV</option>
              <option value="2">Van</option>
              <option value="3">Economy</option>
              <option value="4">Sports Car</option>
              <option value="5">Sedan</option>
              <option value="6">Compact</option>
              <option value="7">Pickup Truck</option>
              <option value="8">Minivan</option>
            </datalist>
            <button className='addNewCarSubmitButton'>Submit</button>
        </form>
      </div>
    </>
  )
  
}

export default AdminVehicles