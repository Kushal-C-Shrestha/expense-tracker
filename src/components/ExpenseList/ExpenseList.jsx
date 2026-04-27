import { useState, useEffect } from "react"

import styles from "./ExpenseList.module.css"

import Table from "../ui/Table/Table"
import Button from "../ui/Button/Button"

import { Pencil, Trash2 } from "lucide-react"
import { set } from "zod"

const ExpenseList = ({ expenses, filteredExpenses, isFiltering, setExpenses, setSelectedExpense, selectedExpense, handleOpenModal, selectedIds, setSelectedIds }) => {
    const data = isFiltering ? filteredExpenses : expenses

    const [isDisabled, setIsDisabled] = useState(false)

    const handleDelete = (id) => {
        if (selectedIds.length > 1) {
            console.log("Delete multiple expenses", selectedIds)
            setExpenses(prevExpenses => prevExpenses.filter(e => !(selectedIds.includes(e.id))));
            setSelectedIds([])
            return
        }
        setExpenses(prevExpenses => prevExpenses.filter(e => e.id !== id));
        setSelectedIds([]);
    }
    const handleEdit = (id) => {
        setSelectedExpense(data.find(e => e.id === id));
        handleOpenModal();
    }

    const handleSelect = (id) => {
        setSelectedIds(prevSelectedIds => {
            if (prevSelectedIds.includes(id)) {
                return prevSelectedIds.filter(selectedId => selectedId !== id);
            } else {
                return [...prevSelectedIds, id];
            }
        });
    }


    useEffect(() => {
        if (selectedIds.length > 1) {
            setIsDisabled(true);
            return;
        }
        setIsDisabled(false)
    }, [selectedIds])



    const columns = [
        { key: "select", label: "", width: "40px", render: (row) => <input type="checkbox" onChange={() => handleSelect(row.id)} checked={selectedIds.includes(row.id)} /> },
        { key: "title", label: "Title", width: "40%" },
        { key: "category", label: "Category", width: "30%" },
        { key: "amount", label: "Amount", width: "20%" },
        {
            key: "actions", label: "Actions", width: "10%", render: (row) => {
                return (
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Button variant="edit" icon={<Pencil size={16} onClick={() => handleEdit(row.id)} />} disabled={isDisabled}>
                            Edit
                        </Button>
                        <Button variant="delete" icon={<Trash2 size={16} onClick={() => handleDelete(row.id)} />} >
                            Delete
                        </Button>
                    </div>
                )
            }
        }
    ]



    return (
        <>
            <Table columns={columns} data={data} className={styles.table} />
        </>
    )
}

export default ExpenseList