const CountryInfo = ({ country }) => {
    return (
        <>
            <h1>{country.name}</h1>
            <p>
                capital {country.capital} <br />
                population {country.population}
            </p>
            <h2>languages</h2>
            <ul>
                {country.languages.map((l, i) => <li key={l.name}>{l.name}</li>)}
            </ul>

            <img src={country.flag} alt={`${country.name} flag`} width="10%"></img>
        </>
    )
}

export default CountryInfo