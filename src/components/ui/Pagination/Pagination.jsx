import React from 'react'
import styles from "./Pagination.module.css"
import { ChevronLeft, ChevronRight, ChevronFirst, ChevronLast } from "lucide-react"
import Button from "../Button/Button"

const Pagination = ({ pages, currentPage, handlePageChange }) => {
    return (
        <div className={styles["pagination"]}>
            <Button icon={<ChevronFirst size={16} />} className={styles["pagination-button"]} disabled={currentPage === 1} onClick={() => handlePageChange(1)} />
            <Button icon={<ChevronLeft size={16} />} className={styles["pagination-button"]} disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} />
            {Array.from({ length: pages }).map((_, index) => (
                <Button key={index} text={index + 1} className={`${styles["pagination-button"]} ${currentPage === index + 1 ? styles["pagination-button--active"] : ""}`} onClick={() => handlePageChange(index + 1)} />
            ))}
            <Button icon={<ChevronRight size={16} />} className={styles["pagination-button"]} disabled={currentPage === pages} onClick={() => handlePageChange(currentPage + 1)} />
            <Button icon={<ChevronLast size={16} />} className={styles["pagination-button"]} disabled={currentPage === pages} onClick={() => handlePageChange(pages)} />
        </div>
    )
}

export default Pagination