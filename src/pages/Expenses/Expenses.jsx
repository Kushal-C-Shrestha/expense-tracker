import React, { useState, useEffect, useCallback } from 'react'
import ExpenseForm from "../../components/ExpenseForm/ExpenseForm"
import ExpenseList from "../../components/ExpenseList/ExpenseList"
import Button from '../../components/ui/Button/Button'
import { Plus, Search, X, Trash2 } from 'lucide-react'
import Input from '../../components/ui/Input/Input'
import Select from '../../components/ui/Select/Select'
import styles from "./Expenses.module.css"
import filters from '../../data/filters'
import Modal from '../../components/ui/Modal/Modal'
import Pagination from '../../components/ui/Pagination/Pagination'
import useFetch from '../../hooks/useFetch'
import { fetchExpenses, addExpense, deleteExpenses } from '../../services/expenses.services'
import useMutation from '../../hooks/useMutation'

const Home = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null)
    const [selectedIds, setSelectedIds] = useState([])
    const [appliedFilter, setAppliedFilter] = useState({
        search: "",
        category: "All",
        sort: "Sort by Date: Descending"
    });
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const isFiltering = appliedFilter.search !== "" || (appliedFilter.category && appliedFilter.category !== "All") || (appliedFilter.sort && appliedFilter.sort !== "Sort by Date: Descending");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Fetching expenses with useFetch hook
    const fetchData = useCallback(() => {
        return fetchExpenses(currentPage, itemsPerPage)
    }, [currentPage, itemsPerPage]);
    const { data, setData, loading: isLoading, error, refetch } = useFetch({ fn: fetchData });
    const expenses = data?.data || [];
    const totalPages = data?.pages;

    // Mutation hook for deleting expenses
    const { loading: isDeleting, error: deleteError, executeMutation: mutateDelete } = useMutation({ fn: (selectedIds) => deleteExpenses(selectedIds) });
    const handleDelete = async () => {
        await mutateDelete(selectedIds);
        setSelectedIds([]);
        toggleDeleteModal();
        await refetch();
        return;
    }

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

    const handlePageChange = (page) => {
        console.log(page);
        setCurrentPage(page);
    };

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
                <ExpenseList expenses={expenses} setSelectedExpense={setSelectedExpense} toggleFormModal={toggleFormModal} selectedIds={selectedIds} setSelectedIds={setSelectedIds} toggleDeleteModal={toggleDeleteModal} appliedFilter={appliedFilter} isLoading={isLoading} />
                {!isLoading && (
                    <Pagination pages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
                )}
                {isOpenModal && (
                    <div className={styles["overlay"]} onClick={toggleFormModal}>
                        <ExpenseForm toggleFormModal={toggleFormModal} setData={setData} filters={filters} selectedExpense={selectedExpense} setSelectedExpense={setSelectedExpense} refetch={refetch} setSelectedIds={setSelectedIds} />
                    </div>)
                }
                {isDeleteModalOpen && (
                    <div className={styles["overlay"]} onClick={toggleFormModal} onClick={() => { toggleDeleteModal(); setSelectedIds([]) }}>
                        <Modal title={"Confirm Delete"} footer={() => {
                            return (<>
                                <Button text="Cancel" variant="cancel" icon={<X />} onClick={toggleDeleteModal} />
                                <Button text="Delete" variant="danger" icon={<Trash2 />} onClick={handleDelete} />
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