import React from 'react'
import styles from "./Header.module.css"
import { Bell, Mail, UserCircle2Icon } from "lucide-react"

import { useLocation } from 'react-router-dom'
import { navItems } from "../../data/navItems"

import Button from '../ui/Button/Button'

const Header = () => {
    const location = useLocation()
    const activeItem = navItems.find((item) => item.path === location.pathname)
    return (
        <header className={styles["header"]}>
            <h2>{activeItem ? activeItem.name : "My App"}</h2>
        </header>
    )
}

export default Header