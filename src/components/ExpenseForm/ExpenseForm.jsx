import { useForm } from "react-hook-form";
import { expenseSchema } from "../../schemas/expense.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Check, X } from "lucide-react";

import Input from '../ui/Input/Input';
import Select from "../ui/Select/Select";
import Button from "../ui/Button/Button";
import InputGroup from "../InputGroup";
import styles from "./ExpenseForm.module.css"

import filters from "../../data/filters";

function ExpenseForm({ setExpenses, handleCloseModal }) {
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm({ resolver: zodResolver(expenseSchema) });



    const handleClose = () => {
        reset();
        handleCloseModal();
    }

    const onSubmit = (data) => {
        console.log(data);
        setExpenses(prevExpenses => [...prevExpenses, { ...data, id: Date.now() }]);
        handleClose();
    };


    const category = watch("category");
    const title = watch("title");
    const amount = watch("amount");
    const date = watch("date");

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={styles["expense__form"]} onClick={(e) => e.stopPropagation()}>
                <div className={styles["form__header"]}>
                    <h2 className={styles["form__title"]}>Add Expense</h2>
                    <X onClick={handleClose} />
                </div>
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

                <div className={styles["form__actions"]}>
                    <Button text="Cancel" type="button" onClick={handleClose} variant="cancel" icon={<X />} />
                    <Button text="Save" type="submit" icon={<Check />} variant="save" disabled={!title || !amount || !date || !category} />
                </div>
            </form>
        </>
    )
}




export default ExpenseForm