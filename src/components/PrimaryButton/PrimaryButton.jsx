import React from 'react'

const PrimaryButton = ({text , clickEvent , btnClass}) => {
  return (
    <button className={btnClass} onClick={clickEvent}>{text}</button>
  )
}

export default PrimaryButton