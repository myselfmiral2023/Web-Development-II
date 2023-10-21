import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Footer.css"

const Footer = () => {

    const navigate = useNavigate();
  return (
    <div className='footerContainer'>
        <div className="footerContent">
            Quick Links:
            <ul>
                <li onClick={() => navigate("/")}>Home</li>
                <li onClick={() => navigate("/login")}>Login</li>
                <li onClick={() => navigate("/register")}>Register</li>
            </ul>
        </div>
        <div className="copyright">
        &gt;&gt;&gt;&copy;&lt;&lt;&lt; Driven Auto Rental 2023. All Rights Reserved
        </div>
    </div>
  )
}

export default Footer