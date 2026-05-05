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
import Loader from "../ui/Loader/Loader";
import filters from "../../data/filters";
import TextArea from "../ui/TextArea/TextArea";

import { addExpense, editExpense } from "../../services/expenses.services";

import { v4 as uuidv4 } from "uuid";
import useFetch from "../../hooks/useFetch";
import useMutation from "../../hooks/useMutation";

function ExpenseForm({ toggleFormModal, filters, selectedExpense = { id: "", title: "", amount: "", date: "", category: "" }, setSelectedExpense, refetch, setSelectedIds }) {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting }, watch, } = useForm({ resolver: zodResolver(expenseSchema), defaultValues: selectedExpense });
    const { data: addData, error: addError, loading: addLoading, executeMutation: mutateAdd } = useMutation({ fn: (expense) => addExpense(expense) });
    const { data: editData, error: editError, loading: editLoading, executeMutation: mutateEdit } = useMutation({ fn: (expense) => editExpense(expense) });

    const handleClose = () => {
        reset();
        toggleFormModal();
    }

    const onSubmit = async (data) => {
        if (selectedExpense && selectedExpense.id) {
            await handleEdit(data);
            return;
        }
        await handleAdd(data);
        return
    };

    const handleAdd = async (data) => {
        const id = uuidv4();
        let expense = { ...data, id, amount: Number(data.amount) };
        await mutateAdd(expense);
        await refetch();
        if (!addError) {
            toggleFormModal();
        }
    }

    const handleEdit = async (data) => {
        const expense = { ...data, id: selectedExpense.id, amount: Number(data.amount) };
        await mutateEdit(expense);
        await refetch();
        if (!editError) {
            toggleFormModal();
            setSelectedExpense(null);
            setSelectedIds([]);
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
                        <Button text="Save" type="submit" icon={isSubmitting ? <Loader /> : <Check />} variant="save" />
                    </>)
                }} >
                    <div className={styles["form__row"]}>
                        <InputGroup label="Title" errors={errors} name="title" className={styles["form__group"]}>
                            <Input   {...register("title")} placeholder="Enter expense title" disabled={isSubmitting} />
                            {errors.title && <p className={styles["form__error"]}>{errors.title.message}</p>}
                        </InputGroup>
                        <InputGroup label="Amount" errors={errors} type="number" step="0.01" name="amount" className={styles["form__group"]} >
                            <Input type="number" step="0.01"  {...register("amount")} placeholder="Enter amount" disabled={isSubmitting} />
                            {errors.amount && <p className={styles["form__error"]}>{errors.amount.message}</p>}
                        </InputGroup>
                    </div>

                    <div className={styles["form__row"]}>
                        <InputGroup label="Date" errors={errors} type="date" name="date" className={styles["form__group"]}>
                            <Input type="date" {...register("date")} disabled={isSubmitting} />
                            {errors.date && <p className={styles["form__error"]}>{errors.date.message}</p>}
                        </InputGroup>
                        <InputGroup label="Category" errors={errors} name="category" className={styles["form__group"]}>
                            <Select options={filters}  {...register("category")} />
                            {errors.category && <p className={styles["form__error"]}>{errors.category.message}</p>}
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