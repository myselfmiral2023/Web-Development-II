import React, { useState } from 'react'
import "./Checkout.css"

const Agreement = ({setOpenAgreement}) => {

  const [agreed, setAgreed] = useState(false);
  
  const handleAgree = () => {
    setAgreed(!agreed);
  }

  return (
    <div className='agreement'>
      <div className="agreementContainer">
        <h1 className='agreementTitle'>Car Rental Agreement</h1>
        <p>
          
  
  This Car Rental Agreement ("Agreement") is made and entered into on [Date] by and between [Rental Company Name], a company duly organized and existing under the laws of [State/Country], with its principal place of business at [Address] ("Rental Company"), and the individual or entity identified as the "Renter" on the rental contract ("Renter").
        </p>

<p>
  <strong>Vehicle Description and Rental Period:</strong>
  
  The Rental Company agrees to rent to the Renter the vehicle described as [Make, Model, Year, and Vehicle Identification Number (VIN)] (the "Vehicle") for the agreed-upon rental period commencing on [Start Date] and ending on [End Date]. The Renter acknowledges that the Vehicle is in good condition and undertakes to return the Vehicle in the same condition, with normal wear and tear excepted.
</p>

<p>
  <strong>Rental Terms and Conditions:</strong>
  
      Use of Vehicle: The Renter agrees to use the Vehicle solely for personal transportation purposes and in accordance with all applicable laws and regulations. The Renter shall not use the Vehicle for any illegal or prohibited activities.
  
      Insurance and Liabilities: The Renter acknowledges that they are responsible for any damages incurred to the Vehicle during the rental period. The Renter may opt for additional insurance coverage at an extra cost, as outlined in the Insurance Addendum, to mitigate potential liabilities.
  
      Maintenance and Repairs: The Rental Company shall provide the Vehicle in good working condition and undertakes to perform routine maintenance. However, the Renter agrees to promptly notify the Rental Company of any mechanical issues or damages incurred during the rental period.
</p>

<p>
  <strong>Indemnification and Limitation of Liability:</strong>
  
  The Renter agrees to indemnify and hold the Rental Company harmless from and against any claims, damages, losses, liabilities, and expenses arising from the Renter's use of the Vehicle. The Rental Company shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with this Agreement, regardless of the form of action. The Renter acknowledges that the Rental Company is not responsible for any personal property lost or stolen from the Vehicle during the rental period.
</p>

<p>
  <strong>Governing Law and Jurisdiction:</strong>
  
  This Agreement shall be governed by and construed in accordance with the laws of [State/Country]. Any disputes arising under or related to this Agreement shall be resolved exclusively in the courts of [State/Country].
</p>

<p>
  <strong>Agreement Acknowledgment:</strong>
  
  By signing this Agreement, the Renter acknowledges that they have read, understood, and agreed to all terms and conditions outlined herein.
  
  Please note that legal agreements should be drafted or reviewed by legal professionals to ensure they comply with all relevant laws and regulations.
</p>
        
      </div>
      <div className="agreementFooter">
      <label htmlFor="agreementCheckbox">Please Check the Box to Confirm You have Read and Agree to the Above</label>
      <input type="checkbox" onChange={handleAgree}/>
      <button disabled={agreed ? false : true} onClick={() => setOpenAgreement(false)}>Proceed</button>
      </div>
    </div>
  )
}

export default Agreement