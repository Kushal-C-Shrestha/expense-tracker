import React, { useState, useEffect } from 'react'
import ExpenseForm from "../components/ExpenseForm/ExpenseForm"
import ExpenseList from "../components/ExpenseList/ExpenseList"
import Button from '../components/ui/Button/Button'
import { Plus, Search } from 'lucide-react'
import Input from '../components/ui/Input/Input'
import Select from '../components/ui/Select/Select'
import styles from "./Home.module.css"
import filters from '../data/filters'
import useLocalStorage from '../hooks/useLocalStorage'

const Home = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [expenses, setExpenses] = useLocalStorage("expenses", []);
    const [isFiltering, setIsFiltering] = useState(false);
    const [filteredExpenses, setFilteredExpenses] = useState([]);

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
    }

    useEffect(() => { console.log(expenses) }, [expenses])
    return (
        <>
            <h1>Welcome</h1>
            <div className="container">
                <div className="container__header">
                    <h3 className='container__title'>Expense tracker</h3>
                    <div className="container__controls">
                        <Input placeholder="Search expenses" onChange={handleSearch} rightIcon={<Search />} variant="search" />
                        <Select options={["All", ...filters]} onChange={handleFilter} />
                        <Button text="Add Expense" icon={<Plus />} onClick={() => setIsOpenModal(true)} variant='add' />
                    </div>
                </div>
                <ExpenseList expenses={expenses} filteredExpenses={filteredExpenses} isFiltering={isFiltering} setExpenses={setExpenses} />
                {isOpenModal && (
                    <div className={styles["overlay"]} onClick={handleCloseModal}>
                        <ExpenseForm handleCloseModal={handleCloseModal} setExpenses={setExpenses} filters={filters} />
                    </div>)
                }
            </div>

        </>
    )
}

export default Home