import React from 'react'

const InputBox = ({lblName , inputType , onInputChange , val}) => {
  return (
    <>
        <label htmlFor={lblName}>{lblName}</label>
        <input defaultValue={val} type={inputType} className='form-control' onChange={onInputChange} />
    </>
  )
}

export default InputBox