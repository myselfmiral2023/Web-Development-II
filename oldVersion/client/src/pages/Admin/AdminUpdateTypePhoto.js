import React, { useState, useEffect } from "react";
import "./AdminUpdateTypePhoto.css";
import Snackbar from "../../components/Snackbar/Snackbar";
import axios from "../../api/axios";

const VEHICLE_PHOTO_URL = "/vehicletype/files"

const VEHICLE_PHOTO_UPLOAD_URL = "/vehicletype/upload";

const AdminUpdateTypePhoto = () => {

    const [file, setFile] = useState(null);

    const [renderCount, setRenderCount] = useState(0);

    const [SUVFile, setSUVFile] = useState(null)
    const [vanFile, setVanFile] = useState(null)
    const [economyFile, setEconomyFile] = useState(null)
    const [sportsCarFile, setSportsCarFile] = useState(null)
    const [sedanFile, setSedanFile] = useState(null)
    const [compactFile, setCompactFile] = useState(null)
    const [pickupTruckFile, setPickupTruckFile] = useState(null)
    const [minivanFile, setMinivanFile] = useState(null)

  const [SUVPhoto, setSUVPhoto] = useState("");
  const [vanPhoto, setVanPhoto] = useState("");
  const [economyPhoto, setEconomyPhoto] = useState("");
  const [sportsCarPhoto, setSportsCarPhoto] = useState("");
  const [sedanPhoto, setSedanPhoto] = useState("");
  const [compactPhoto, setCompactPhoto] = useState("");
  const [pickupTruckPhoto, setPickupTruckPhoto] = useState("");
  const [minivanPhoto, setMinivanPhoto] = useState("");

  const [updatePhotoSuccess, setUpdatePhotoSuccess] = useState(false);

  const [editSuccess, setEditSuccess] = useState(false);
  const [editSuccessMsg, setEditSuccessMsg] = useState("");
  const [editError, setEditError] = useState(false);
  const [editErrorMsg, setEditErrorMsg] = useState("");

  useEffect(() => {
    axios
      .get(`${VEHICLE_PHOTO_URL}/suvred.jpg`)
      .then((response) => {
        setSUVPhoto(response.data);

        return axios.get(`${VEHICLE_PHOTO_URL}/van.jpg`);
      })
      .then((secondResponse) => {
        setVanPhoto(secondResponse.data);

        return axios.get(`${VEHICLE_PHOTO_URL}/economy.jpg`);
      })
      .then((thirdResponse) => {
        setEconomyPhoto(thirdResponse.data);

        return axios.get(`${VEHICLE_PHOTO_URL}/sportscar.jpg`);
      })
      .then((fourthResponse) => {
        setSportsCarPhoto(fourthResponse.data);

        return axios.get(`${VEHICLE_PHOTO_URL}/sedanblack.jpg`);
      })
      .then((fifthResponse) => {
        setSedanPhoto(fifthResponse.data);

        return axios.get(`${VEHICLE_PHOTO_URL}/compact.jpg`);
      })
      .then((sixthResponse) => {
        setCompactPhoto(sixthResponse.data);

        return axios.get(`${VEHICLE_PHOTO_URL}/pickuptruck.jpg`);
      })
      .then((seventhResponse) => {
        setPickupTruckPhoto(seventhResponse.data);

        return axios.get(`${VEHICLE_PHOTO_URL}/minivan.jpg`);
      })
      .then((eighthResponse) => {
        setMinivanPhoto(eighthResponse.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [updatePhotoSuccess, renderCount]);

  const handleUpdatePhoto = (e, string) => {
    console.log(`${VEHICLE_PHOTO_URL}/${string}.jpg`)
    e.preventDefault();
      axios
          .delete(`${VEHICLE_PHOTO_URL}/${string}.jpg`)
          .then((response) => {

            console.log(response);
            const formData = new FormData();

            const newFileName = string + ".jpg";
            const blob = new Blob([file], { type: file.type });
            blob.name = newFileName;

            const renamedFile = new File([blob], newFileName, { type: file.type });

            formData.append("file", renamedFile);

            return axios.post(VEHICLE_PHOTO_URL, formData);
          })
          .then((secondResponse) => {
            console.log(secondResponse.data)

            return axios.get(`${VEHICLE_PHOTO_URL}/${string}.jpg`)
          })
       .then((thirdResponse) => {
          console.log(file);

          // const reader = new FileReader();

          // reader.onloadend = () => {
          //   reader.readAsDataURL(file);
          //   setImageUrl(reader.result);
          // }



          
          setUpdatePhotoSuccess(true);
          setEditSuccess(true);
          setEditSuccessMsg("The photo has been updated");
       })
       .catch((error) => {
        console.log(error);
        setEditError(true);
        setEditErrorMsg(error.response.data)
       })
      }  

      const handleFileInput = (e, setClassFile) => {
       setFile(e.target.files[0])
      setClassFile(true);
      }

      const handleAddPhoto = (e, string, setCarPhoto) => {
        e.preventDefault()
        const formData = new FormData();

        console.log("file contents:")
        console.log(file)

        const newFileName = string + ".jpg";
        console.log("new file name after string concat")
        console.log(newFileName)
        const blob = new Blob([file], { type: file.type });
        blob.name = newFileName;

        const renamedFile = new File([blob], newFileName, { type: file.type });

        formData.append("file", renamedFile);

        axios
        .post(VEHICLE_PHOTO_UPLOAD_URL, formData)
        .then((response) => {
            console.log("response to post");
            console.log(response);
          setEditSuccessMsg("Your Photo has been added");
          setEditSuccess(true);

          return axios.get(`${VEHICLE_PHOTO_URL}/${string}.jpg`)
        })
        .then((secondResponse) => {
            setCarPhoto(secondResponse.data);
            setUpdatePhotoSuccess(true)
        })
        .catch((error) => {
          console.log(error);
          setEditError(true);
          setEditErrorMsg(error.response.data)
         })
}

  return (
    <div className="adminUpdateTypePhoto">
      {editSuccess && <Snackbar type="success" message={editSuccessMsg} />}
      {editError && <Snackbar type="failure" message={editErrorMsg} />}
      <div className="adminUpdateTypePhotoContainer">
        <ul className="adminCarTypePhotoList">
          <li className="adminCarTypePhotoListItem">
            <p>SUV Class Vehicle Photo</p>
            <img src={SUVPhoto} alt="" className="adminCarTypePhotoImage"/>
            <form
              onSubmit={(e) => handleAddPhoto(e, "suvred", setSUVPhoto)}
              className="updateCarTypePhotoForm"
            >
              <label className="file" htmlFor="file">
                Update Car Type Photo
              </label>
              <input
                type="file"
                id="file"
                name=""
                onChange={(e) => handleFileInput(e, setSUVFile)}
              />
              <button disabled={!SUVFile ? true : false} className="updateCarTypePhotoButton">Add</button>
            </form>
          </li>
          <li className="adminCarTypePhotoListItem">
            <p>Van Class Vehicle Photo</p>
            <img src={vanPhoto} alt="" className="adminCarTypePhotoImage" />
            <form
              onSubmit={(e) => handleAddPhoto(e, "van", setVanPhoto)}
              className="updateCarTypePhotoForm"
            >
              <label className="file" htmlFor="file">
                Update Car Type Photo
              </label>
              <input
                type="file"
                id="file"
                name=""
                onChange={(e) => handleFileInput(e, setVanFile)}
              />
              <button disabled={!vanFile ? true : false} className="updateCarTypePhotoButton">Add</button>
            </form>
          </li>
          <li className="adminCarTypePhotoListItem">
            <p>Economy Class Vehicle Photo</p>
            <img src={economyPhoto} alt="" className="adminCarTypePhotoImage" />
            <form
              onSubmit={(e) => handleAddPhoto(e, "economy", setEconomyPhoto)}
              className="updateCarTypePhotoForm"
            >
              <label className="file" htmlFor="file">
                Update Car Type Photo
              </label>
              <input
                type="file"
                id="file"
                name=""
                onChange={(e) => handleFileInput(e, setEconomyFile)}
              />
              <button disabled={!economyFile ? true : false} className="updateCarTypePhotoButton">Add</button>
            </form>
          </li>
          <li className="adminCarTypePhotoListItem">
            <p>Sports Car Class Vehicle Photo</p>
            <img src={sportsCarPhoto} alt="" className="adminCarTypePhotoImage" />
            <form
              onSubmit={(e) => handleAddPhoto(e, "sportscar", setSportsCarPhoto)}
              className="updateCarTypePhotoForm"
            >
              <label className="file" htmlFor="file">
                Update Car Type Photo
              </label>
              <input
                type="file"
                id="file"
                name=""
                onChange={(e) => handleFileInput(e, setSportsCarFile)}
              />
              <button disabled={!sportsCarFile ? true : false} className="updateCarTypePhotoButton">Add</button>
            </form>
          </li>
          <li className="adminCarTypePhotoListItem">
            <p>Sedan Class Vehicle Photo</p>
            <img src={sedanPhoto} alt="" className="adminCarTypePhotoImage" />
            <form
              onSubmit={(e) => handleAddPhoto(e, "sedanblack", setSedanPhoto)}
              className="updateCarTypePhotoForm"
            >
              <label className="file" htmlFor="file">
                Update Car Type Photo
              </label>
              <input
                type="file"
                id="file"
                name=""
                onChange={(e) => handleFileInput(e, setSedanFile)}
              />
              <button disabled={!sedanFile ? true : false} className="updateCarTypePhotoButton">Add</button>
            </form>
          </li>
          <li className="adminCarTypePhotoListItem">
            <p>Compact Class Vehicle Photo</p>
            <img src={compactPhoto} alt="" className="adminCarTypePhotoImage" />
            <form
              onSubmit={(e) => handleAddPhoto(e, "compact", setCompactPhoto)}
              className="updateCarTypePhotoForm"
            >
              <label className="file" htmlFor="file">
                Update Car Type Photo
              </label>
              <input
                type="file"
                id="file"
                name=""
                onChange={(e) => handleFileInput(e, setCompactFile)}
              />
              <button disabled={!compactFile ? true : false} className="updateCarTypePhotoButton">Add</button>
            </form>
          </li>
          <li className="adminCarTypePhotoListItem">
            <p>Pickup Truck Class Vehicle Photo</p>
            <img src={pickupTruckPhoto} alt="" className="adminCarTypePhotoImage" />
            <form
              onSubmit={(e) => handleAddPhoto(e, "pickuptruck", setPickupTruckPhoto)}
              className="updateCarTypePhotoForm"
            >
              <label className="file" htmlFor="file">
                Update Car Type Photo
              </label>
              <input
                type="file"
                id="file"
                name=""
                onChange={(e) => handleFileInput(e, setPickupTruckFile)}
              />
              <button disabled={!pickupTruckFile ? true : false} className="updateCarTypePhotoButton">Add</button>
            </form>
          </li>
          <li className="adminCarTypePhotoListItem">
            <p>Minivan Class Vehicle Photo</p>
            <img src={minivanPhoto} alt="" className="adminCarTypePhotoImage" />
            <form
              onSubmit={(e) => handleAddPhoto(e, "minivan", setMinivanPhoto)}
              className="updateCarTypePhotoForm"
            >
              <label className="file" htmlFor="file">
                Update Car Type Photo
              </label>
              <input
                type="file"
                id="file"
                name=""
                onChange={(e) => handleFileInput(e, setMinivanFile)}
              />
              <button disabled={!minivanFile ? true : false}  className="updateCarTypePhotoButton">Add</button>
            </form>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminUpdateTypePhoto;
