import Country from "./Country.js";

const Results = ({ searchTerm, filteredCountries }) => {


    if (searchTerm === '') {
        return (<p></p>)
    } else if (filteredCountries.length > 10){
        return (<p>Too many matches, specify another filter</p>)
    } else {
        return (
        filteredCountries.map((c, i) => <Country key={i}country={c} count={filteredCountries.length} />)
        )
    } 
}

export default Results