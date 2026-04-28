import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Header from '../components/Header/Header'
import styles from "./DashboardLayout.module.css"
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
    return (
        <div className={styles["dashboard-layout"]}>
            <div className={styles["dashboard-layout__left"]}>
                <Navbar />
            </div>
            <div className={styles["dashboard-layout__right"]}>
                <Header />
                <div className={styles["main-content"]}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout