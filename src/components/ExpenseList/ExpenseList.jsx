import { useState, useEffect, useMemo } from "react"

import styles from "./ExpenseList.module.css"

import Table from "../ui/Table/Table"
import Button from "../ui/Button/Button"

import { Pencil, Trash2 } from "lucide-react"

const ExpenseList = ({ expenses, setExpenses, setSelectedExpense, toggleFormModal, selectedIds, setSelectedIds, toggleDeleteModal, appliedFilter, isLoading }) => {

    const data = useMemo(() => {
        let updated = [...expenses];

        if (appliedFilter.search) {
            const searchValue = appliedFilter.search.toLowerCase();
            updated = expenses.filter(expense => expense.title.toLowerCase().includes(searchValue));
        }

        if (appliedFilter.category && appliedFilter.category !== "All") {
            updated = updated.filter(expense => expense.category === appliedFilter.category);
        }

        if (appliedFilter.sort) {
            updated = [...updated].sort((a, b) => {
                if (appliedFilter.sort === "Sort by Date: Descending") {
                    return new Date(b.date) - new Date(a.date);
                } else if (appliedFilter.sort === "Sort by Date: Ascending") {
                    return new Date(a.date) - new Date(b.date);
                } else if (appliedFilter.sort === "Sort by Amount: (Low to high)") {
                    return a.amount - b.amount;
                } else if (appliedFilter.sort === "Sort by Amount: (High to low)") {
                    return b.amount - a.amount;
                }
            });
        }

        return updated;
    }, [expenses, appliedFilter])
    const [isDisabled, setIsDisabled] = useState(false)


    const handleEdit = (id) => {
        setSelectedExpense(data.find(e => e.id === id));
        toggleFormModal();
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

    const handleSelectAll = () => {
        if (selectedIds.length === data.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(data.map(d => d.id));
        }
    };

    useEffect(() => {
        if (selectedIds.length > 1) {
            setIsDisabled(true);
            return;
        }
        setIsDisabled(false)
    }, [selectedIds])

    const mapCategoryToColor = (category) => {
        switch (category.toLowerCase()) {
            case "food":
                return "red";
                break;
            case "transportation":
                return "blue";
                break;
            case "entertainment":
                return "green";
                break;
            case "utilities":
                return "orange";
                break;
            case "healthcare":
                return "purple";
                break;
            default:
                return "gray";
        }
    }

    const columns = [
        { key: "select", label: "", width: "40px", render: (row) => <input type="checkbox" onChange={() => handleSelect(row.id)} checked={selectedIds.includes(row.id)} />, headerRender: () => <input type="checkbox" onChange={handleSelectAll} checked={selectedIds.length === data.length && data.length > 0} /> },
        { key: "title", label: "Title", width: "40%" },
        { key: "date", label: "Date", width: "20%", render: (row) => new Date(row.date).toLocaleDateString() },
        {
            key: "category", label: "Category", width: "20%", render: (row) => <div className="pill__container">
                <div className={`${styles["category__pill"]} ${styles[`category__pill--${mapCategoryToColor(row.category)}`]}`}>{row.category}</div>
            </div>
        },
        { key: "amount", label: "Amount", width: "20%" },
        {
            key: "actions", label: "Actions", width: "10%", render: (row) => {
                return (
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Button variant="edit" icon={<Pencil size={16} />} onClick={() => handleEdit(row.id)} disabled={isDisabled}>
                            Edit
                        </Button>
                        <Button variant="delete" icon={<Trash2 size={16} />} onClick={() => { setSelectedIds((prev) => prev.includes(row.id) ? prev : [...prev, row.id]); toggleDeleteModal() }}>
                            Delete
                        </Button>
                    </div>
                )
            }
        }
    ]

    const footer = {
        columns: [
            { key: "total", label: "Total expenses:", colspan: "4" },
            { key: "totalAmount", label: data.reduce((total, row) => total + Number(row.amount) || 0, 0), colspan: "2" }
        ]
    }



    return (
        <>
            <Table columns={columns} data={data} className={styles.table} footer={footer} />
        </>
    )
}

export default ExpenseList