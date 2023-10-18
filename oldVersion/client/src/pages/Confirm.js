import React from 'react'
import Calendar from 'react-calendar'
import "../components/Calendar/Calendar.css"

const Confirm = () => {
  return (
    <>
    <div><Calendar minDate={new Date()} view='month' onClickDay={(date) => console.log(date)} /></div>
    <div>Auto model types available during your selected search</div>
    </>
  )
}

export default Confirm