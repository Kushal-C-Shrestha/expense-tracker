import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { expenseSchema } from "../../schemas/expense.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Check, X } from "lucide-react";

import Input from '../ui/Input/Input';
import Select from "../ui/Select/Select";
import Button from "../ui/Button/Button";
import InputGroup from "../InputGroup";
import styles from "./ExpenseForm.module.css"
import Modal from "../ui/Modal/Modal";

import filters from "../../data/filters";
import TextArea from "../ui/TextArea/TextArea";

import { v4 as uuidv4 } from "uuid";

function ExpenseForm({ setExpenses, toggleFormModal, filters, selectedExpense = { id: "", title: "", amount: "", date: "", category: "" }, setSelectedExpense }) {
    const { register, handleSubmit, reset, formState: { errors }, watch, } = useForm({ resolver: zodResolver(expenseSchema), defaultValues: selectedExpense });

    const handleClose = () => {
        reset();
        toggleFormModal();
    }

    const handleEdit = async (data) => {
        console.log("Editing expense:", data);
        try {
            const response = await fetch(`http://localhost:3000/expenses/${data.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...data, id: data.id })
            });
            if (!response.ok) {
                throw new Error("Failed to edit expense");
            }
            const updatedExpense = await response.json();
            setExpenses(prevExpenses => prevExpenses.map(e => e.id === data.id ? updatedExpense : e));
            setSelectedExpense(null);
            handleClose();
        } catch (error) {
            console.error("Error editing expense:", error);
        }
    }

    const onSubmit = async (data) => {
        console.log(selectedExpense);
        console.log(data);
        if (selectedExpense && selectedExpense.id) {
            await handleEdit(data);
            return;
        }

        await handleAdd(data);
        handleClose();
        return
    };

    const handleAdd = async (data) => {
        console.log("Adding expense:", data);
        const id = uuidv4();
        let expense = { ...data, id };
        try {
            const response = await fetch("http://localhost:3000/expenses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(expense)
            });
            if (!response.ok) {
                throw new Error("Failed to add expense");
            }
            const newExpense = await response.json();
            setExpenses(prevExpenses => [...prevExpenses, newExpense]);
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    }

    const category = watch("category");
    const title = watch("title");
    const amount = watch("amount");
    const date = watch("date");

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} onClick={(e) => e.stopPropagation()}>
                <Modal title={selectedExpense ? "Edit Expense" : "Add Expense"} handleClose={handleClose} footer={() => {
                    return (<>
                        <Button text="Cancel" type="button" onClick={handleClose} variant="cancel" icon={<X />} />
                        <Button text="Save" type="submit" icon={<Check />} variant="save" disabled={!title || !amount || !date || !category} />
                    </>)
                }} >
                    <div className={styles["form__row"]}>
                        <InputGroup label="Title" errors={errors} name="title" className={styles["form__group"]}>
                            <Input   {...register("title")} placeholder="Enter expense title" />
                        </InputGroup>
                        <InputGroup label="Amount" errors={errors} type="number" step="0.01" name="amount" className={styles["form__group"]} >
                            <Input type="number" step="0.01"  {...register("amount")} placeholder="Enter amount" />
                        </InputGroup>
                    </div>

                    <div className={styles["form__row"]}>
                        <InputGroup label="Date" errors={errors} type="date" name="date" className={styles["form__group"]}>
                            <Input type="date" {...register("date")} />
                        </InputGroup>
                        <InputGroup label="Category" errors={errors} name="category" className={styles["form__group"]}>
                            <Select options={filters}  {...register("category")} />
                        </InputGroup>
                    </div>
                    <div className={styles["form__row"]}>
                        <InputGroup label="Description" errors={errors} name="description" className={styles["form__group"]}>
                            <TextArea  {...register("description")} placeholder="Enter expense description" disabled={isSubmitting} />
                        </InputGroup>
                    </div>
                </Modal>
            </form>
        </>
    )
}




export default ExpenseForm