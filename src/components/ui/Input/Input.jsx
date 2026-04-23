import React from 'react'
import styles from "./Input.module.css"

const Input = ({ label, errors = {}, type = "text", leftIcon, rightIcon, error = false, variant = "default", ...props }) => {
    return (
        <div className={styles["input-wrapper"]}>
            {leftIcon && leftIcon}
            <input type={type} {...props} className={`${styles["input"]} ${styles[`input--${variant}`]} ${errors ? styles["input-error"] : ""} `} />
            {rightIcon && rightIcon}
        </div>
    )
}

export default Input