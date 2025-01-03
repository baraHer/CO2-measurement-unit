import './LocationForm.css'

import {useEffect, useRef, useState} from "react";

const LocationForm = () => {

    const cityRef = useRef(null)

    useEffect(() => {
        cityRef?.current.focus()
    }, [])

    const [locationAutofill, setLocationAutofill] = useState([])
    const [locationInput, setLocationInput] = useState('')
    const [weatherData, setWeatherData] = useState(null)

    const API_BASE_URL = 'http://api.weatherapi.com/v1'
    const API_KEY = '0e813ae11e09437e95934223250301'

    const getWeatherData = async (location) => {

        const apiUrlWeather = `${API_BASE_URL}/forecast.json?key=${API_KEY}&q=id:${location.id}&lang=cs`
        const response = await fetch(apiUrlWeather)
        const data = await response.json()

        console.log(data)
        setWeatherData(data)
    }

    const submit = async (event) => {
        event.preventDefault()

        const apiUrlLocation =`${API_BASE_URL}/search.json?key=${API_KEY}&q=${locationInput}&lang=cs`
        const responseLocation = await fetch(apiUrlLocation)
        const dataLocation = await responseLocation.json()
        const location = dataLocation[0]

        await getWeatherData(location)
    }

    const handleLocationInputChange = (event) => {
        const newLocation = event.target.value;
        setLocationInput(newLocation);
    }

    return (
        <div>
            <form onSubmit={submit}>
                <h3>Zadej obec:</h3>
                <input
                    name='obec'
                    value={locationInput}
                    onChange={(event) => {handleLocationInputChange(event)}}
                    placeholder='př. Teplice'
                    ref={cityRef}
                />
                <button>Odeslat</button>
            </form>
        </div>
    );
};

export default LocationForm;