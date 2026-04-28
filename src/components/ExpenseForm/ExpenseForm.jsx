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

import useLocalStorage from "../../hooks/useLocalStorage";


function ExpenseForm({ setExpenses, handleCloseModal, filters, selectedExpense = { title: "", amount: "", date: "", category: "" }, setSelectedExpense, setIsFiltering }) {
    const { register, handleSubmit, reset, formState: { errors }, watch, } = useForm({ resolver: zodResolver(expenseSchema), defaultValues: selectedExpense });


    const handleClose = () => {
        reset();
        handleCloseModal();
    }

    const handleEdit = (data) => {
        setExpenses(prevExpenses => prevExpenses.map(e => e.id === selectedExpense.id ? { ...data, id: selectedExpense.id } : e));
        setSelectedExpense(null);
        handleClose();
        setIsFiltering(false);
        return;
    }

    const onSubmit = (data) => {
        console.log(selectedExpense);
        console.log(data);
        if (selectedExpense && selectedExpense.id) {
            handleEdit(data);
            return;
        }

        setExpenses(prevExpenses => [...prevExpenses, { ...data, id: Date.now() }]);
        handleClose();
        setIsFiltering(false);
        return
    };

    useEffect(() => {
        if (selectedExpense) {
            reset(selectedExpense);
        } else {
            reset();
        }
    }, [selectedExpense, reset])


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
                </Modal>
            </form>
        </>
    )
}




export default ExpenseForm