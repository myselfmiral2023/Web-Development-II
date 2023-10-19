import React from "react";
import axios from "../../api/axios";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { vehicleSchema } from "../../validations/VehicleValidation";
import Snackbar from "../../components/Snackbar/Snackbar";
import "./Admin.css";
const VEHICLE_URL = "/vehicle";
const VEHICLE_PHOTO_URL = "/vehicletype/files";

const VEHICLE_TYPE_DICT = {
  1: "SUV",
  2: "Van",
  3: "Economy",
  4: "Sports Car",
  5: "Sedan",
  6: "Compact",
  7: "Pickup Truck",
  8: "Minivan",
};

const AdminSingleVehicle = () => {
  const [vehicle, setVehicle] = useState({});

  const [vehiclePhoto, setVehiclePhoto] = useState("");

  const [editSelected, setEditSelected] = useState(false);

  const { id } = useParams();

  const [vehicleName, setVehicleName] = useState("");

  const [vehicleCompany, setVehicleCompany] = useState("");

  const [vehiclePrice, setVehiclePrice] = useState(0);

  const [vehicleType, setVehicleType] = useState("");

  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    console.log("submit selected");
    try {
      let formData = {
        name: e.target[0].value,
        company: e.target[1].value,
        perdayrent: e.target[2].value,
        vehicletypeid: e.target[3].value,
      };

      const isValid = await vehicleSchema.isValid(formData);

      console.log("is valid?" + isValid)

      if (isValid) {
        const response = await axios.patch(`${VEHICLE_URL}/${id}`, {
          name: vehicleName,
          company: vehicleCompany,
          perdayrent: vehiclePrice,
          vehicletypeid: vehicleType,
        });

        console.log(response);
        if (response.status === 200) {
          setSuccess(true);
          setSuccessMsg(response.data.message);
          setEditSelected(false);
        }
      } else{
        setErrMsg("Invalid data in one or more fields")
        setError(true);
      }
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No server response");
      } else {
        setError(true);
        setErrMsg(error.response.data);
      }
    }
    setEditSelected(false);
  };

  useEffect(() => {
    axios
      .get(`${VEHICLE_URL}/${id}`)
      .then((response) => {
        setVehicle(response.data);
        setVehicleName(response.data.name);
        setVehicleCompany(response.data.company);
        setVehiclePrice(response.data.perdayrent);
        setVehicleType(response.data.vehicletypeid);
        console.log(response);

        // const photoUrlPath = VEHICLE_TYPE_DICT[vehicleType].toLowerCase();
        
        return axios.get(`${VEHICLE_PHOTO_URL}/sedan.jpg`);
      })
      .then((secondResponse) => {
            setVehiclePhoto(secondResponse.data)
          console.log(secondResponse);
        
      })
      .catch((error) => {
        
        console.error(error);
      });
  }, [id, editSelected]);


  return (
    <>
      {success && <Snackbar type="success" message={successMsg} />}
      {error && <Snackbar type="failure" message={errMsg} />}
      <div className="singleUserPageContainer">
        {editSelected ? (
          <section className="vehicleEditFormContainer">
            <div>
              <h1>Edit Vehicle Information</h1>
              <button className="returnButton" onClick={() => setEditSelected(false)}>
                Cancel Edit
              </button>
            </div>
            <form onSubmit={handleEditSubmit} id="types">
              <label htmlFor="vehicleName">Unit Name:</label>
              <input
                id="vehicleName"
                type="text"
                autoComplete="off"
                onChange={(e) => setVehicleName(e.target.value)}
                required
                placeholder="Vehicle Name"
                value={vehicleName}
              />
              <label htmlFor="vehicleCompany">Unit Manufacturer</label>
              <input
                id="vehicleCompany"
                type="text"
                autoComplete="off"
                onChange={(e) => setVehicleCompany(e.target.value)}
                required
                placeholder="Vehicle Manuf."
                value={vehicleCompany}
              />
              <label htmlFor="costPerDay">
                Daily Price (rounded to nearest dollar):
              </label>
              <input
                id="costPerDay"
                type="number"
                autoComplete="off"
                onChange={(e) => setVehiclePrice(e.target.value)}
                required
                value={vehiclePrice}
              />
              <label htmlFor="types">Unit Type:</label>
              <select id='types' name='types' form='types'value={vehicleType} required onChange={(e) => setVehicleType(e.target.value)}>
              <option value="1">SUV</option>
              <option value="2">Van</option>
              <option value="3">Economy</option>
              <option value="4">Sports Car</option>
              <option value="5">Sedan</option>
              <option value="6">Compact</option>
              <option value="7">Pickup Truck</option>
              <option value="8">Minivan</option>
            </select>
              <button className="editButton">Update Vehicle</button>
            </form>
            <img className="vehicleImage" src={vehiclePhoto} alt={`Vehicle Type`} />
          </section>
        ) : (
          <section className="singleVehicleContainer">
            <Link to="/admin/vehicles">
              <button className="returnButton">Return to Vehicles Page</button>
            </Link>
            <h1>Viewing Vehicle: {vehicleName}</h1>

            <ul>
              <li className="imageItem">
                <img className="vehicleImage" src={vehiclePhoto} alt={`Vehicle Type`} />
              </li>
              <li><span>Unit Name:</span> {vehicle.name}</li>
              <li><span>Company:</span>{vehicle.company}</li>
              <li><span>Price Per Day:</span> {vehicle.perdayrent}.00</li>
              <li><span>Vehicle Type:</span>{VEHICLE_TYPE_DICT[vehicleType]}</li>
            </ul>
            <button className="editButton" onClick={() => setEditSelected(true)}>Edit Vehicle</button>
          </section>
        )}
      </div>
    </>
  );
};

export default AdminSingleVehicle;
