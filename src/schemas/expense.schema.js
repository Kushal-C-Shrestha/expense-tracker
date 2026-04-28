import z from "zod"

export const expenseSchema = z.object({
    title: z.string().min(1, "Title is required"),
    amount: z.string().min(1, "Amount is required").refine(value => !isNaN(parseFloat(value)) && parseFloat(value) > 0, "Amount must be a positive number"),
    date: z.string().min(1, "Date is required").refine(date => !isNaN(Date.parse(date)), "Invalid date format"),
    category: z.enum(["Food", "Transportation", "Entertainment", "Utilities", "Healthcare", "Other"]),
})