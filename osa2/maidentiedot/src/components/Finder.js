const Finder = ({ searchTerm, onChange }) => {
    return (
        <div>
            find countries: <input value={searchTerm} onChange={onChange}></input>
        </div>
    )
}

export default Finder