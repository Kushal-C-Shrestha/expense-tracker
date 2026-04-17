import React from 'react'
import Select from './ui/Select';

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
        <Select options={["All", ...filters]} onChange={handleFilter} label="Filter by category" />
    )
}

export default Filter