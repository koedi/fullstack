const Country = ({ country }) => {
    return (
        <div>
            <h1>{country.name}</h1>
            <p>
                capital {country.capital} <br />
                population {country.population}
            </p>
            <h2>languages</h2>
            <ul>
                {country.languages.map((l, i) => <li key={i}>{l.name}</li>)}
            </ul>

            <img src={country.flag} alt="country flag" width="10%"></img>


        </div>
    )



}

export default Country