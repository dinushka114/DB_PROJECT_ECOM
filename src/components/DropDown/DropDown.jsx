import React from 'react'

const DropDown = ({lbl}) => {
    return (
        <>
            <label htmlFor={lbl}>{lbl}</label>
            <select name="" className='form-control' id="">

            </select>
        </>
    )
}

export default DropDown