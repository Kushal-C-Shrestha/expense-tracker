import { useForm } from "react-hook-form";
import { expenseSchema } from "../schemas/expense.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from './ui/Input';
import Select from "./ui/Select";
import Button from "./ui/Button";

function AddExpense({ setExpenses, filters }) {
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm({ resolver: zodResolver(expenseSchema) });

    const onSubmit = (data) => {
        console.log(data);
        setExpenses(prevExpenses => [...prevExpenses, { ...data, id: Date.now() }]);
        reset();
    };

    const category = watch("category");
    const title = watch("title");
    const amount = watch("amount");
    const date = watch("date");

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="add-form">
                <Input
                    type="text"
                    placeholder="Title"
                    {...register("title")}
                    label="Title"
                    name="title"
                    errors={errors}
                />
                <Input
                    type="number"
                    placeholder="Amount"
                    {...register("amount")}
                    label="Amount"
                    step="0.01"
                    name="amount"
                    errors={errors}
                />
                <Input
                    type="date"
                    {...register("date")}
                    label="Date"
                    name="date"
                    errors={errors}
                />
                <Select options={filters} {...register("category")} label="Category" errors={errors} />
                <Button title="Add Expense" onClick={handleSubmit} />
            </form>
        </>
    )
}



export default AddExpense