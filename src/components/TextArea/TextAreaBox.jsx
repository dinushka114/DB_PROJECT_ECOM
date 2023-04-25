import React from 'react'

const TextAreaBox = ({ lbl, onInputChange, val }) => {
    return (
        <>
            <label htmlFor={lbl}>{lbl}</label>
            <textarea name="" id="" cols="30" rows="4" defaultValue={val} className='form-control' onChange={onInputChange} />
        </>
    )
}

export default TextAreaBox