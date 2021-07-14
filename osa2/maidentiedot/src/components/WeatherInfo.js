const WeatherInfo = ({ weather }) => {

    if (weather !== null) {
        return (
            <div>
                <h2>Weather in {weather.location.name}</h2>
                temperature: {weather.current.temperature} &deg; Celsius <br />

                <img src={weather.current.weather_icons[0]} alt={weather.current.weather_descriptions[0]} /> <br />

                wind: {weather.current.wind_speed} mph <br />
                direction: {weather.current.wind_dir}
            </div>
        )
    } else {
        return (
            <>
            </>
        )
    }
}


export default WeatherInfo