import ExpenseCard from "./ExpenseCard"

const ExpenseList = ({ expenses, filteredExpenses, isFiltering, setExpenses }) => {

    return (
        <>
            <p className="expense-list-header">Expense list:</p>
            {isFiltering && filteredExpenses.length === 0 && <p className="expenses-not-found">No expenses found.</p>}
            {isFiltering && (filteredExpenses.map(expense => <ExpenseCard key={expense.id} expense={expense} />))}
            {!isFiltering && expenses.length === 0 && <p className="expenses-not-found">No expenses added yet.</p>}
            {!isFiltering && expenses.map(expense => <ExpenseCard key={expense.id} expense={expense} setExpenses={setExpenses} />)}
            {filteredExpenses.length != 0 &&
                <p>{filteredExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0)}</p>}
            {!isFiltering && expenses.length != 0 &&
                < p > {expenses.reduce((sum, expense) => sum + Number(expense.amount), 0)}</p>}
        </>
    )
}

export default ExpenseList