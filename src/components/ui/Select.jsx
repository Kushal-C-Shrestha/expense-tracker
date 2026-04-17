import React from 'react'

const Select = ({ options, label, ...props }) => {
    return (
        <div className='input-group'>
            <label htmlFor={label}>{label}</label>
            <select {...props} >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Select