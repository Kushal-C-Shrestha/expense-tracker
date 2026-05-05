export const fetchExpenses = async (page, itemsPerPage, appliedFilter) => {
    console.log("Fetching expenses with filters:", appliedFilter);
    let api = `http://localhost:3000/expenses?_page=${page}&_per_page=${itemsPerPage}`;

    if (appliedFilter?.search) {
        api += `&title_like=${appliedFilter.search}`
    }
    if (appliedFilter?.category && appliedFilter?.category !== "All") {
        api += `&category=${appliedFilter.category}`
    }
    if (appliedFilter?.sort) {
        const [sortField, sortOrder] = appliedFilter.sort.split(": ");
        const sortKey = sortField === "Sort by Date" ? "date" : "amount";
        const sortDirection = sortOrder === "Descending" || sortOrder === "(High to low)" ? "-" : "";
        console.log("Sorting by:", `${sortDirection}${sortKey}`);
        api += `&_sort=${sortDirection}${sortKey}`;
        console.log("API after sorting:", api);
    }

    const response = await fetch(api);
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