import React from 'react'
import styles from "./Button.module.css"

const Button = ({ text, icon, variant = 'primary', disabled, ...props }) => {
    return (
        <button className={`${styles[`button--${variant}`]} ${styles.button}`} disabled={disabled} {...props}>
            {icon && icon}
            {text}
        </button>
    )
}

export default Button