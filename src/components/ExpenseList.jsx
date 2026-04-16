import ExpenseCard from "./ExpenseCard"

const ExpenseList = ({ expenses, filteredExpenses, isFiltering, setExpenses }) => {

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {isFiltering && filteredExpenses.length === 0 && <tr className="expenses-not-found"><td colSpan="4"><p>No expenses found.</p></td></tr>}
                    {isFiltering && (filteredExpenses.map(expense => <ExpenseCard key={expense.id} expense={expense} />))}
                    {!isFiltering && expenses.length === 0 && <tr className="expenses-not-found"><td colSpan="4"><p>No expenses added yet.</p></td></tr>}
                    {!isFiltering && expenses.map(expense => <ExpenseCard key={expense.id} expense={expense} setExpenses={setExpenses} />)}
                </tbody>
                {filteredExpenses.length != 0 && <tfoot>
                    <tr>
                        <td colSpan="2">Total:</td>
                        <td colSpan="2">{filteredExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0)}</td>
                    </tr>
                </tfoot>}
                {!isFiltering && expenses.length != 0 && <tfoot>
                    <tr>
                        <td colSpan="2">Total:</td>
                        <td colSpan="2">{expenses.reduce((sum, expense) => sum + Number(expense.amount), 0)}</td>
                    </tr>
                </tfoot>}
            </table>
        </>
    )
}

export default ExpenseList