import React from 'react'
import styles from "./Modal.module.css"
import { X } from "lucide-react"

const Modal = ({ title, children, footer, handleClose }) => {
    return (
        <div className={styles["modal"]}>
            <div className={styles["modal__header"]}>
                <h2>{title}</h2>
                <X onClick={handleClose} />
            </div>
            <div className={styles["modal__body"]}>
                {children}
            </div>
            <div className={styles["modal__footer"]}>
                {footer? footer() : null}
            </div>
        </div>
    )
}

export default Modal