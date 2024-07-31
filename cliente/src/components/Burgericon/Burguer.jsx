import React from 'react'
import "./Burguer.scss"
const Burguer = ({handleClick, clicked}) => {
  return (
    <div onClick={handleClick} className={`icon nav-icon-4 ${clicked? "open": ""}`}>
    <span></span>
    <span></span>
    <span></span>
  </div>
  )
}

export default Burguer