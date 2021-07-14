import { useState, useEffect } from "react"
import axios from "axios"

import WeatherInfo from "./WeatherInfo"
import CountryInfo from "./CountryInfo"

const Info = ({ country }) => {

    const [weather, setWeather] = useState(null)


    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
            .then(response => {
                setWeather(response.data)
            })
    }, [country.capital])

    return (
        <>
            <CountryInfo country={country} />
            <WeatherInfo weather={weather} />          
        </>
    )
}

export default Info