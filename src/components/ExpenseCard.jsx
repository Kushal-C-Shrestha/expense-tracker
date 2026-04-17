import React from 'react'

const ExpenseCard = ({ expense, setExpenses }) => {

    const handleDelete = () => {
        setExpenses(prevExpenses => prevExpenses.filter(e => e.id !== expense.id));
    }

    return (
        <div className='expense-card'>
            <p>{expense.title}</p>
            <p>{expense.category}</p>
            <p>{expense.amount}</p>
            <button onClick={handleDelete} className='delete-button'>Delete</button>
        </div>
    )
}

export default ExpenseCard