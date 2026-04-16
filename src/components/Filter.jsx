import React from 'react'

const Filter = ({ filters, setFilteredExpenses, setIsFiltering, expenses }) => {
    const handleFilter = (e) => {
        const selectedFilter = e.target.value;
        e.target.value = selectedFilter;
        if (selectedFilter === "All") {
            setFilteredExpenses([]);
            setIsFiltering(false);
            return;
        }
        setIsFiltering(true);
        setFilteredExpenses(expenses.filter(expense => expense.category === selectedFilter));
        console.log(selectedFilter);
    }
    return (
        <select onChange={handleFilter} className='filter-dropdown'>
            <option value="All">All</option>
            {filters.map((filter) => (
                <option key={filter} value={filter}>
                    {filter}
                </option>
            ))}
        </select>
    )
}

export default Filter