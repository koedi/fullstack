import React, {useState, useEffect} from "react";
import axios from 'axios'

import Finder from "./components/Finder";
import Countries from "./components/Countries";



function App() {
  const [countries, setCountries] = useState([''])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([''])


  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  })

  const handleChange = (event) => {
    setSearchTerm(event.target.value)
    setFilteredCountries(countries.filter(c => (c.name.toLowerCase()).includes(event.target.value.toLowerCase())))
  }


  return (
    <div>
      <Finder searchTerm={searchTerm} onChange={handleChange} /> 
      <Countries searchTerm={searchTerm} filteredCountries={filteredCountries} />
    </div>
  )
}







export default App;
