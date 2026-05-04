import React from 'react'
import styles from "./TextArea.module.css"

const TextArea = ({ ...props }) => {
    return (
        <textarea className={styles["textarea"]} {...props}></textarea>
    )
}

export default TextArea