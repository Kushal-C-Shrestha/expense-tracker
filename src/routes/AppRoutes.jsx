import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Expenses } from "../pages/index"

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/expenses" element={<Expenses />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes