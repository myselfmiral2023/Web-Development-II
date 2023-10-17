import React from 'react'
import "./Unauthorized.css"
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'

const Unauthorized = () => {

  const navigate =useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  return (
    <>
    <div className='containerUnauth'>
      <span className='symbolUnauth'><FontAwesomeIcon icon={faCircleExclamation}/></span>
    <h1 className='titleUnauth'>Unauthorized</h1>

    <h2>You do not have permission to view this page.</h2>

    <button className="backButtonUnauth" onClick={goBack}>Go back</button>
    </div>
    </>
  )
}

export default Unauthorized