import React from 'react'
import Input from './ui/Input/Input';
import styles from "./ui/Input/Input.module.css"

const InputGroup = ({ label, children, className, ...props }) => {
  return (
    <div className={className || styles["input-group"]}>
      <label htmlFor={props.name}>{label}</label>
      {children}
    </div>
  )
}

export default InputGroup