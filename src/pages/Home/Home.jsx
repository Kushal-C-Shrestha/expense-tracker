import React, { useState, useEffect } from 'react'
import ExpenseForm from "../../components/ExpenseForm/ExpenseForm"
import ExpenseList from "../../components/ExpenseList/ExpenseList"
import Button from '../../components/ui/Button/Button'
import { Plus, Search, X } from 'lucide-react'
import Input from '../../components/ui/Input/Input'
import Select from '../../components/ui/Select/Select'
import styles from "./Home.module.css"
import filters from '../../data/filters'
import useLocalStorage from '../../hooks/useLocalStorage'

const Home = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [expenses, setExpenses] = useLocalStorage("expenses", []);
    const [isFiltering, setIsFiltering] = useState(false);
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [selectedExpense, setSelectedExpense] = useState(null)
    const [selectedIds, setSelectedIds] = useState([])


    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();
        const filteredExpenses = expenses.filter(expense => expense.title.toLowerCase().includes(searchValue));
        if (searchValue === "") {
            setFilteredExpenses([]);
            setIsFiltering(false);
            return;
        }
        setFilteredExpenses(filteredExpenses);
        setIsFiltering(true);
    }

    const handleFilter = (e) => {
        const selectedFilter = e.target.value;
        e.target.value = selectedFilter;
        if (selectedFilter === "All") {
            setFilteredExpenses([]);
            setIsFiltering(false);
            return;
        }
        setIsFiltering(true);
        setFilteredExpenses(expenses.filter(expense => expense.category === selectedFilter));
        console.log(selectedFilter);
    }

    const handleOpenModal = () => {
        setIsOpenModal(true);
    }

    const handleCloseModal = () => {
        setIsOpenModal(false);
        setSelectedExpense(null);
        setSelectedIds([]);
    }

    const handleSort = (e) => {
        console.log(e.target.value);
        const expensesToSort = isFiltering ? filteredExpenses : expenses;
        console.log(expensesToSort);
        const selectedSort = e.target.value;
        e.target.value = selectedSort;
        let sortedExpenses = [];
        if (selectedSort === "Sort by Date: Ascending") {
            sortedExpenses = [...expensesToSort].sort((a, b) => new Date(a.date) - new Date(b.date));
        } else if (selectedSort === "Sort by Date: Descending") {
            sortedExpenses = [...expensesToSort].sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (selectedSort === "Sort by Amount: (Low to high)") {
            sortedExpenses = [...expensesToSort].sort((a, b) => a.amount - b.amount);
        } else if (selectedSort === "Sort by Amount: (High to low)") {
            sortedExpenses = [...expensesToSort].sort((a, b) => b.amount - a.amount);
        }
        console.log(sortedExpenses);
        setFilteredExpenses(sortedExpenses);
        setIsFiltering(true);
    };

    const handleClearFilters = () => {
        setIsFiltering(false);
        setFilteredExpenses([]);
    }


    return (
        <>
            <div className={styles["container"]}>
                <div className={styles["container__header"]}>
                    <div className={styles["container__header--left"]}>
                        <Input placeholder="Search expenses" onChange={handleSearch} rightIcon={<Search color='#bababa' strokeWidth={1.5} />} variant="search" />
                        <Select options={["All", ...filters]} onChange={handleFilter} />
                        <Select options={["Sort by Date: Ascending", "Sort by Date: Descending", "Sort by Amount: (Low to high)", "Sort by Amount: (High to low)"]} onChange={handleSort} />
                        {isFiltering && <Button text="Clear Filters" onClick={handleClearFilters} variant='clear' icon={<X/>} />}
                    </div>
                    <div className={styles["container__header--right"]}>
                        <Button text="Add Expense" icon={<Plus size={18} />} onClick={() => setIsOpenModal(true)} variant='add' />
                    </div>
                </div>
                <ExpenseList expenses={expenses} filteredExpenses={filteredExpenses} isFiltering={isFiltering} setExpenses={setExpenses} setSelectedExpense={setSelectedExpense} handleOpenModal={handleOpenModal} selectedIds={selectedIds} setSelectedIds={setSelectedIds} />
                {isOpenModal && (
                    <div className={styles["overlay"]} onClick={handleCloseModal}>
                        <ExpenseForm handleCloseModal={handleCloseModal} setExpenses={setExpenses} filters={filters} selectedExpense={selectedExpense} setSelectedExpense={setSelectedExpense} setIsFiltering={setIsFiltering} />
                    </div>)
                }
            </div>

        </>
    )
}

export default Home