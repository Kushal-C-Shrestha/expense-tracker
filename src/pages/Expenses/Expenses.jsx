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
import Modal from '../../components/ui/Modal/Modal'

const Home = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [expenses, setExpenses] = useLocalStorage("expenses", []);
    const [isFiltering, setIsFiltering] = useState(false);
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [selectedExpense, setSelectedExpense] = useState(null)
    const [selectedIds, setSelectedIds] = useState([])
    const [appliedFilter, setAppliedFilter] = useState({
        search: "",
        category: "All",
        sort: ""
    });
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        console.log(appliedFilter);
        let updated = [...expenses];

        if (appliedFilter.search) {
            const searchValue = appliedFilter.search.toLowerCase();
            updated = expenses.filter(expense => expense.title.toLowerCase().includes(searchValue));
        }

        if (appliedFilter.category && appliedFilter.category !== "All") {
            updated = updated.filter(expense => expense.category === appliedFilter.category);
        }

        if (appliedFilter.sort) {
            if (appliedFilter.sort === "" || appliedFilter.sort === "Sort by Date: Descending") {
                updated = [...updated].sort((a, b) => new Date(b.date) - new Date(a.date));
            } else {
                updated = [...updated].sort((a, b) => {
                    if (appliedFilter.sort === "Sort by Date: Ascending") {
                        return new Date(a.date) - new Date(b.date);
                    } else if (appliedFilter.sort === "Sort by Amount: (Low to high)") {
                        return a.amount - b.amount;
                    } else if (appliedFilter.sort === "Sort by Amount: (High to low)") {
                        return b.amount - a.amount;
                    }
                });
            }

        }

        setFilteredExpenses(updated);
        setIsFiltering(appliedFilter.search !== "" || (appliedFilter.category && appliedFilter.category !== "All") || (appliedFilter.sort && appliedFilter.sort !== "Sort by Date: Descending"));
    }, [appliedFilter.category, appliedFilter.search, appliedFilter.sort, expenses])

    useEffect(() => {
        setExpenses((expenses) => { expenses.sort((a, b) => new Date(b.date) - new Date(a.date)); return expenses })
    }, [expenses])

    const handleOpenModal = () => {
        setIsOpenModal(true);
    }

    const handleCloseModal = () => {
        setIsOpenModal(false);
        setSelectedExpense(null);
        setSelectedIds([]);
    }

    const handleClearFilters = () => {
        setAppliedFilter({
            search: "",
            category: "All",
            sort: "Sort by Date: Descending"
        });
    }

    const toggleDeleteModal = () => {
        console.log("Toggling delete modal");
        if (isDeleteModalOpen) {
            setIsDeleteModalOpen(false);
        } else {
            setIsDeleteModalOpen(true);
        }
    }

    const handleDelete = () => {
        setExpenses(prevExpenses => prevExpenses.filter(e => !(selectedIds.includes(e.id))));
        setSelectedIds([])
        return
    }

    return (
        <>
            <div className={styles["container"]}>
                <div className={styles["container__header"]}>
                    <div className={styles["container__header--left"]}>
                        <Input placeholder="Search expenses" value={appliedFilter.search} onChange={(e) => { console.log(e); setAppliedFilter((prev) => ({ ...prev, search: e.target.value })) }} rightIcon={<Search color='#bababa' strokeWidth={1.5} />} variant="search" />
                        <Select options={["All", ...filters]} value={appliedFilter.category} onChange={(e) => { setAppliedFilter((prev) => ({ ...prev, category: e.target.value })) }} />
                        <Select options={["Sort by Date: Descending", "Sort by Date: Ascending", "Sort by Amount: (Low to high)", "Sort by Amount: (High to low)"]} value={appliedFilter.sort} onChange={(e) => { setAppliedFilter((prev) => ({ ...prev, sort: e.target.value })) }} />
                        {isFiltering && <Button text="Clear Filters" onClick={handleClearFilters} variant='clear' icon={<X />} />}
                    </div>
                    <div className={styles["container__header--right"]}>
                        <Button text="Add Expense" icon={<Plus size={18} />} onClick={() => setIsOpenModal(true)} variant='add' />
                    </div>
                </div>
                <ExpenseList expenses={expenses} filteredExpenses={filteredExpenses} isFiltering={isFiltering} setExpenses={setExpenses} setSelectedExpense={setSelectedExpense} handleOpenModal={handleOpenModal} selectedIds={selectedIds} setSelectedIds={setSelectedIds} toggleDeleteModal={toggleDeleteModal} />
                {isOpenModal && (
                    <div className={styles["overlay"]} onClick={handleCloseModal}>
                        <ExpenseForm handleCloseModal={handleCloseModal} setExpenses={setExpenses} filters={filters} selectedExpense={selectedExpense} setSelectedExpense={setSelectedExpense} setIsFiltering={setIsFiltering} />
                    </div>)
                }
                {isDeleteModalOpen && (
                    <div className={styles["overlay"]} onClick={handleCloseModal} onClick={() => { toggleDeleteModal(); setSelectedIds([]) }}>
                        <Modal title={"Confirm Delete"} footer={() => {
                            return (<>
                                <Button text="Cancel" variant="cancel" onClick={toggleDeleteModal} />
                                <Button text="Delete" variant="danger" onClick={handleDelete} />
                            </>)

                        }} handleClose={toggleDeleteModal}>
                            <p>Are you sure you want to delete the selected expenses? ({selectedIds.length})</p>
                            <div>
                                {selectedIds.map(id => {
                                    const expense = expenses.find(e => e.id === id);
                                    return (
                                        <div key={id}>
                                            <p>{expense.title} {expense.date} {expense.amount}</p>
                                        </div>
                                    )
                                })
                                }

                            </div>
                        </Modal>
                    </div>)}
            </div>

        </>
    )
}

export default Home