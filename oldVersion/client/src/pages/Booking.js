import React, {useContext, useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { format, parseISO, isBefore, isAfter } from 'date-fns';
import axios from '../api/axios';
import { AuthContext } from '../contexts/AuthContext';
import Snackbar from '../components/Snackbar/Snackbar';
import "./Booking.css"
import LeaveAReview from '../components/LeaveReview/LeaveAReview';

const SINGLE_BOOKING_URL = "/vehiclebooking"

const Booking = () => {

    const navigate = useNavigate();
    
    const {id} = useParams();

    const {user} = useContext(AuthContext);

    const [booking, setBooking] = useState({})

    const [openModal, setOpenModal] = useState(false);

    const today = format(new Date(), 'yyyy-MM-dd');


    const [formattedOrderDate, setFormattedOrderDate] = useState("");
    const [formattedStartDate, setFormattedStartDate] = useState("");
    const [formattedEndDate, setFormattedEndDate] = useState("");

  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteSuccessMsg, setDeleteSuccessMsg] = useState("");
  const [deleteError, setDeleteError] = useState(false);
  const [deleteErrorMsg, setDeleteErrorMsg] = useState("");


    useEffect(() => {
      axios
          .get(`${SINGLE_BOOKING_URL}/${id}`)
          .then((response) => {
            console.log(response);
            //FIXME
            //NOT DRY code here, but date-fns library throws errors when formatting is done in JSX for some reason
                setBooking(response.data)

                if(response.data.userid !== user.id){
                  navigate("/unauthorized");
                }
                const orderDate = new Date(response.data.bookingdate)
                const startDate = new Date(response.data.startdate)
                const endDate = new Date(response.data.enddate)
                
                const orderFormatDate = format(orderDate, "yyyy-MM-dd")
                const startFormatDate = format(startDate, "yyyy-MM-dd")
                const endFormatDate = format(endDate, "yyyy-MM-dd")
                setFormattedOrderDate(orderFormatDate)
                setFormattedStartDate(startFormatDate)
                setFormattedEndDate(endFormatDate)
          })
          .catch((error) => {
            console.log(error);
          })


    }, [])

        const handleCancel = () => {
            axios
            .delete(`${SINGLE_BOOKING_URL}/${id}`)
            .then((response) => {
              // console.log(response)
              setDeleteSuccess(true);
              setDeleteSuccessMsg(response.data.message)
              
                setTimeout(() => {
                    navigate("/profile");
                  }, 3200)
              
            })
            .catch((error) => {
              setDeleteError(true);
              setDeleteErrorMsg(error.response.data)
            })
        }

        const handleReview = () => {
            setOpenModal(true);
        }

  return (
    <div className='singleBooking'>
        {deleteSuccess && <Snackbar type="success" message={deleteSuccessMsg} />}
      {deleteError && <Snackbar type="failure" message={deleteErrorMsg} />}
        <div className="singleBookingContainer">
            <h1>Booking Details</h1>
            <p>Order Number: {booking.uuid}</p>
            <p>Order Placed: {formattedOrderDate}</p>
            <ul>
                <li>Client: {user.fullname}</li>
                <li>Vehicle: {booking.name}</li>
                <li>Pick up date: {formattedStartDate}</li>
                <li>Drop off date: {formattedEndDate}</li>
                <li>Cost: {booking.cost}</li>
            </ul>
            <div className="singleBookingButtonContainer">
            <button disabled={isAfter(parseISO(formattedEndDate), new Date()) ? true : false} className='leaveAReviewButton' onClick={handleReview}>Leave a Review</button>
            <button disabled={isBefore(parseISO(formattedEndDate), new Date()) ? true : false} className='cancelButton' onClick={handleCancel}>Cancel Booking</button>
            
        </div>
        {isAfter(parseISO(formattedEndDate), new Date()) ? <div className='cannotReviewMessageContainer'><p >You cannot leave a review until your after your rental drop off date.</p></div> : ""}
        {isBefore(parseISO(formattedEndDate), new Date()) ? <div className='cannotCancelMessageContainer'><p >You cannot cancel a booking whose end date has already passed.</p></div> : ""}
        {openModal && <LeaveAReview setOpen={setOpenModal} bookingid={id}/>}
        </div>
        
    </div>
  )
}

export default Booking