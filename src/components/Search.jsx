import Input from "./ui/Input";

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
            <Input
                type="text"
                placeholder="Search expenses"
                onChange={handleSearch}
                label="Search"
            />
        </>
    )
}


export default Search