import { useForm } from "react-hook-form";
import { expenseSchema } from "../schemas/expense.schema";
import { zodResolver } from "@hookform/resolvers/zod";

function AddExpense({ setExpenses, filters }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(expenseSchema) });

    const onSubmit = (data) => {
        console.log(data);
        setExpenses(prevExpenses => [...prevExpenses, { ...data, id: Date.now() }]);
        reset();
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="add-form">
                <div className="input-group">
                    <input {...register("title")} placeholder="Title" className="form-input" />
                    {errors.title && <p className="error-message">{errors.title.message}</p>}
                </div>
                <div className="input-group">
                    <input {...register("amount")} type="number" placeholder="Amount" step="0.01" className="form-input" />
                    {errors.amount && <p className="error-message">{errors.amount.message}</p>}
                </div>
                <div className="input-group">
                    <input {...register("date")} type="date" className="form-input" />
                    {errors.date && <p className="error-message">{errors.date.message}</p>}
                </div>
                <select {...register("category")} id="category" className="form-input">
                    {filters.map((filter) => (
                        <option key={filter} value={filter}>
                            {filter}
                        </option>
                    ))}
                </select>
                <button type="submit" className="submit-button">Add Expense</button>
            </form>
        </>
    )
}


export default AddExpense