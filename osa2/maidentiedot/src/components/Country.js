import { useState } from "react"

import Info from "./Info"

const Country = ({ country, count }) => {
    const [show, setShow] = useState(false)

    const toggleInfo = (c) => {
        setShow(!show)
    }

    if (count === 1) {
        return (
            <Info country={country} />
        )
    }


    if (!show) {
        return (
            <div>
                {country.name}
                <button onClick={toggleInfo}>show</button>
            </div>
        )
    } else {

        return (
            <div>
                {country.name}
                <button onClick={toggleInfo}>show</button>

                <Info country={country} />
            </div>
        )
    }


}

export default Country