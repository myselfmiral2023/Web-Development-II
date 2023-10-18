import React from 'react'
import Calendar from 'react-calendar'

const SearchDate = () => {
  return (
    <>
    <div><Calendar minDate={new Date()} view='month' onClickDay={(date) => console.log(date)} /></div>
    <div>Auto model types available during your selected search</div>
    </>
  )
}

export default SearchDate