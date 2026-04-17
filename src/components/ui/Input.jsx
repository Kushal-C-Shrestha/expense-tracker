import React from 'react'

const Input = ({ label, errors = {}, name, ...props }) => {
    return (
        <div className='input-group'>
            <label htmlFor={label}>{label}</label>
            <input {...props} name={name} />
            {errors[name] && <p className="error-message">{errors[name].message}</p>}
        </div>
    )
}

export default Input