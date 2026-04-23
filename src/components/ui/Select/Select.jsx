import React from 'react'
import styles from "./Select.module.css"

const Select = ({ options,...props }) => {
    return (
        <select {...props} className={styles["select"]}>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    )
}

export default Select