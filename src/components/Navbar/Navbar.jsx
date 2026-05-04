import React from 'react'
import { navItems } from "../../data/navItems"
import { NavLink } from 'react-router-dom'
import styles from "./Navbar.module.css"

const Navbar = () => {
    return (
        <nav className={styles["nav"]}>
            <div className={styles["nav-header"]}>
                <h2>Expense Tracker</h2>
            </div>
            {
                navItems.map((item) => {
                    const Icon = item.icon
                    return (
                        <div key={item.id} >
                            <NavLink to={item.path} className={({ isActive }) => `${styles["nav-item"]} ${isActive ? styles["nav-item--active"] : ""}`}>
                                <Icon />
                                <span>{item.name}</span>
                            </NavLink>
                        </div>
                    )
                })
            }
        </nav >

    )
}

export default Navbar