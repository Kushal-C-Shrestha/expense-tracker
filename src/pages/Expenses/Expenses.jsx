import React, { useState, useEffect } from 'react'
import ExpenseForm from "../../components/ExpenseForm/ExpenseForm"
import ExpenseList from "../../components/ExpenseList/ExpenseList"
import Button from '../../components/ui/Button/Button'
import { Plus, Search, X } from 'lucide-react'
import Input from '../../components/ui/Input/Input'
import Select from '../../components/ui/Select/Select'
import styles from "./Expenses.module.css"
import filters from '../../data/filters'
import Modal from '../../components/ui/Modal/Modal'

const Home = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const [selectedExpense, setSelectedExpense] = useState(null)
    const [selectedIds, setSelectedIds] = useState([])
    const [appliedFilter, setAppliedFilter] = useState({
        search: "",
        category: "All",
        sort: "Sort by Date: Descending"
    });
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const isFiltering = appliedFilter.search !== "" || (appliedFilter.category && appliedFilter.category !== "All") || (appliedFilter.sort && appliedFilter.sort !== "Sort by Date: Descending");

    const toggleFormModal = () => {
        if (isOpenModal) {
            setIsOpenModal(false);
            setSelectedExpense(null);
        } else {
            setIsOpenModal(true);
        }
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

    const handleDelete =async () => {
        try {
            const response = await Promise.all(selectedIds.map(id => {
                return fetch(`http://localhost:3000/expenses/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            }));
            if (!response.ok) {
                throw new Error("Failed to delete expenses");
            }
        } catch (error) {
            console.error("Error deleting expenses:", error);
        }
        setExpenses(prevExpenses => prevExpenses.filter(e => !(selectedIds.includes(e.id))));
        setSelectedIds([])
        return
    }

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await fetch("http://localhost:3000/expenses");
                if (!response.ok) {
                    throw new Error("Failed to fetch expenses");
                }
                const data = await response.json();
                setExpenses(data);
            } catch (error) {
                console.error("Error fetching expenses:", error);
            }
        };
        fetchExpenses();
    }, [])

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
                <ExpenseList expenses={expenses} setExpenses={setExpenses} setSelectedExpense={setSelectedExpense} toggleFormModal={toggleFormModal} selectedIds={selectedIds} setSelectedIds={setSelectedIds} toggleDeleteModal={toggleDeleteModal} appliedFilter={appliedFilter} isLoading={isLoading} />
                {isOpenModal && (
                    <div className={styles["overlay"]} onClick={toggleFormModal}>
                        <ExpenseForm toggleFormModal={toggleFormModal} setExpenses={setExpenses} filters={filters} selectedExpense={selectedExpense} setSelectedExpense={setSelectedExpense} />
                    </div>)
                }
                {isDeleteModalOpen && (
                    <div className={styles["overlay"]} onClick={toggleFormModal} onClick={() => { toggleDeleteModal(); setSelectedIds([]) }}>
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