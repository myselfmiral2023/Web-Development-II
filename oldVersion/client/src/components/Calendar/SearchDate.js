import React from 'react'
import Calendar from 'react-calendar'

const SearchDate = () => {
  return (
    <div><Calendar minDate={new Date()} view='month' onClickDay={(date) => console.log(date)} /></div>
  )
}

export default SearchDate