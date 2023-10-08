import axios from 'axios'
const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
const baseUrlCountry = 'https://studies.cs.helsinki.fi/restcountries/api/name/'
export const getCountry = (name) => {
    return axios.get(baseUrlCountry + name)
        .then((response) => response.data)
}
const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api/all'
export const getAll = () => {
    return axios.get(baseURL)
        .then((response) => response.data)
}

const getLocation = async (capital) => {
    console.log(capital)
    const location = axios.create({
        baseURL: `http://api.openweathermap.org/geo/1.0/direct`,
        params: {
            q: capital[0], 
            limit: 1,
            appid: apiKey,
        }
    })
    return location.get().then(response => {
        let lat = response.data[0].lat
        let lon = response.data[0].lon
        console.log(lat, lon)
        return [lat, lon]
    }).catch(error => {
        console.log("Error Locating City" + error)
        return [0.0, 0.0];
    })

}

export const getWeather = async (capital) => {
    try {
        let [lat, lon] = await getLocation(capital)
        console.log("Getted; ", capital, lat, lon)
        const instance = axios.create({
            baseURL: `https://api.openweathermap.org/data/2.5/weather`,
            params: {
                lat: lat,
                lon: lon,
                appid: apiKey,
                units: "metric",
                lang: "es",
            },
        });
        return instance.get().then((response) => {
            return response.data
        }).catch(error=>console.log("Error: " + error));
    } catch (error) {
        console.error("Error fetching weather data:", error);
    } 

}

export const getIcon = async (cod) => {
    return "https://openweathermap.org/img/wn/"+cod+"@2x.png"
}