import React, { useEffect } from 'react'
import styles from "./Dashboard.module.css"
import StatCard from '../../components/StatCard/StatCard'
import { DollarSign, Calendar, Clock, CircleDollarSign } from "lucide-react"
import useLocalStorage from '../../hooks/useLocalStorage'

const Dashboard = () => {
    const [expenses, setExpenses] = useLocalStorage("expenses", [])
    console.log(expenses);
    const stats = [{
        title: "Total expenses",
        icon: <DollarSign />,
        value: `Rs. ${expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0)}`
    }, {
        title: "Total transactions",
        icon: <CircleDollarSign />,
        value: expenses.length
    }, {
        title: "This month",
        icon: <Calendar />,
        value: `Rs. ${expenses.filter(expense => {
            const expenseDate = new Date(expense.date);
            const now = new Date();
            return expenseDate.getMonth() === now.getMonth() && expenseDate.getFullYear() === now.getFullYear();
        }).reduce((acc, expense) => acc + parseFloat(expense.amount), 0)}`,
        indicatorValue: "-12.5%",
        indicator: "down"
    }, {
        title: "This week",
        icon: <Clock />,
        value: `Rs. ${expenses.filter(expense => {
            const expenseDate = new Date(expense.date);
            const now = new Date();
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(now.getDate() - 7);
            return expenseDate >= sevenDaysAgo && expenseDate <= now;
        }).reduce((acc, expense) => acc + parseFloat(expense.amount), 0)}`,
        indicatorValue: "5%",
        indicator: "up"
    }];
    useEffect(() => {
        const total = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
        console.log(total);
    }, [expenses])

    return (
        <>
            <div className={styles["stat-cards"]}>
                {stats.map((stat, index) => (
                    <StatCard
                        key={index}
                        title={stat.title}
                        icon={stat.icon}
                        value={stat.value}
                        indicatorValue={stat.indicatorValue}
                        indicator={stat.indicator}
                    />
                ))}
            </div>
        </>
    )
}

export default Dashboard