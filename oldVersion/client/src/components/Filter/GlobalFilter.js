import React from 'react'
import "./GlobalFilter.css"

const GlobalFilter = ({filter, setFilter}) => {
  return (
    <span>Search: <input className='filterInput' value={filter || ''} onChange={(e) => setFilter(e.target.value)} placeholder='...&#9906;'/></span>
  )
}

export default GlobalFilter