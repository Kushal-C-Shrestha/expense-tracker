import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Dashboard, Expenses } from "../pages/index"
import DashboardLayout from '../Layouts/DashboardLayout'

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route element={<DashboardLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/expenses" element={<Expenses />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes