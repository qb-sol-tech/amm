/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react'

function Popmsg(props) {
   
  return (
   
    <div className={`message-popup ${props.className}`}>{props.children}</div>
    
  )
}

export default Popmsg