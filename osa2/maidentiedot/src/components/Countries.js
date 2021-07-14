
import Country from "./Country.js";

const Countries = ({ searchTerm, filteredCountries }) => {
    return (
        <div>
            {(searchTerm === '') ? <p></p> :
                (filteredCountries.length > 10) ? <p>Too many matches, specify another filter</p> :
                (filteredCountries.length !== 1) ? filteredCountries.map((c, i) => <p key={i}>{c.name}</p>) : 
                    <Country country={filteredCountries[0]} />
            }
        </div>
    )
}

export default Countries