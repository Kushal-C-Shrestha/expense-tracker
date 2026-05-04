export const fetchExpenses = async (page, itemsPerPage) => {
    const response = await fetch(`http://localhost:3000/expenses?_page=${page}&_per_page=${itemsPerPage}`);
    if (!response.ok) {
        throw new Error("Failed to fetch expenses");
    }
    return await response.json();
};

export const addExpense = async (expense) => {
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
    return await response.json();
};

export const editExpense = async (expense) => {
    const response = await fetch(`http://localhost:3000/expenses/${expense.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(expense)
    });
    if (!response.ok) {
        throw new Error("Failed to edit expense");
    }
    return response.json();
};

export const deleteExpenses = async (ids) => {
    console.log("Deleting expenses with IDs:", ids);
    const response = await Promise.all(ids.map(id => {
        return fetch(`http://localhost:3000/expenses/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
    }));
    if (!response.ok) {
        throw new Error("Failed to delete expenses");
    }
    return response.json();
};
