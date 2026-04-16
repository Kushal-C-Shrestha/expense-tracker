import { useState, useEffect } from "react"

import AddExpense from "./components/AddExpense"
import Search from "./components/Search"
import ExpenseList from "./components/ExpenseList"
import Filter from "./components/Filter"
import "./App.css"

function App() {
  const [expenses, setExpenses] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const filters = ["Food", "Transportation", "Entertainment"]

  useEffect(() => { console.log(expenses) }, [expenses])
  return (
    <>
      <h1>Expense tracker</h1>
      <div className="search-filter-container">
        <Search expenses={expenses} setFilteredExpenses={setFilteredExpenses} setIsFiltering={setIsFiltering} />
        <Filter filters={filters} setFilteredExpenses={setFilteredExpenses} setIsFiltering={setIsFiltering} expenses={expenses} />
      </div>
      <AddExpense setExpenses={setExpenses} filters={filters} />
      <ExpenseList expenses={expenses} filteredExpenses={filteredExpenses} isFiltering={isFiltering} setExpenses={setExpenses} />
    </>
  )
}

export default App
