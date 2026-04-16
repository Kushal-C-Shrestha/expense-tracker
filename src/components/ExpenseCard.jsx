import React from 'react'

const ExpenseCard = ({ expense, setExpenses }) => {

    const handleDelete = () => {
        setExpenses(prevExpenses => prevExpenses.filter(e => e.id !== expense.id));
    }

    return (
        <tr >
            <td>{expense.title}</td>
            <td>{expense.category}</td>
            <td>{expense.amount}</td>
            <td><button onClick={handleDelete} className='delete-button'>Delete</button></td>
        </tr>
    )
}

export default ExpenseCard