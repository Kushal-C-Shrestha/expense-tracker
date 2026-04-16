import { set } from "react-hook-form";

function Search({ expenses, setFilteredExpenses, setIsFiltering }) {
    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();
        const filteredExpenses = expenses.filter(expense => expense.title.toLowerCase().includes(searchValue));
        if (searchValue === "") {
            setFilteredExpenses([]);
            setIsFiltering(false);
            return;
        }
        setFilteredExpenses(filteredExpenses);
        setIsFiltering(true);
    }

    return (
        <>
            <input type="text" name="search" id="search" placeholder="Search expenses" onChange={handleSearch} className="search-bar" autoComplete="off" />
        </>
    )
}


export default Search