import './App.css'
import { useEffect, useState } from 'react';
import { getCountry, getAll, getWeather, getIcon } from './services/countries';

const Country = ({ name }) => {
  const [info, setInfo] = useState({})
  const [weather, setWeather] = useState({})
  useEffect(() => {
    async function fetchData() {
      try {
        const countryData = await getCountry(name);
        const tmpInfo = {
          name: countryData.name.common,
          capital: countryData.capital,
          area: countryData.area,
          languages: countryData.languages,
          flag: countryData.flags.png,
        };
        setInfo(tmpInfo);

        const weatherData = await getWeather(countryData.capital);
        const tmpWeather = {
          temp: weatherData.main.temp,
          wind: weatherData.wind,
          cod: weatherData.weather[0].icon,
          desc: weatherData.weather[0].description,
        };
        setWeather(tmpWeather);
        console.log(tmpWeather)
        console.log(weather)
        const iconData = await getIcon(weatherData.weather[0].icon);
        setWeather((prevWeather)=>({
          ...prevWeather,
          icon: iconData
        }));
      } catch (error) {
        console.error('Error:', error);
      }
      console.log(weather)
    }
    fetchData();
  }, []);

  return (
    <>
      {(info) ?
        <div>
          <h1>{info.name}</h1>
          <br></br>
          <p>capital: {info.capital}</p>
          <p>area: {info.area}</p>
          <br></br>
          <h5>languages</h5>
          <ul>
            {Object.keys(info.languages || {}).map((lang) => (
              <li key={lang}>{info.languages[lang]}</li>
            ))}
          </ul>
          <img src={info.flag} style={{ height: '100px', width: '180px' }} alt={info.name + " flag"}></img>
          <h1>Weather in: {info.capital} </h1>
          <p>temperature: {weather.temp ? weather.temp + ' celcius' : 'Loading...'} </p>
          <img src={weather.icon || ''} alt={weather.desc || ''}></img>
          <p>wind: {weather.wind ? weather.wind.speed + ' m/s' : 'Loading...'} </p>
        </div>
        : null}
    </>
  )
}

const CountryFilter = ({ search, handleSearch }) => {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    getAll().then(data => {
      setCountries(data.map(country => (country.name.common)))
    })
      .catch((error) => console.log("Error Fetching Countries Data: " + error))
  }, []);

  const searchCountries = () => {
    //VERIFICAR NUMERO DE RESULTADOS 
    let tmpCountries = countries.filter(country => {
      if (country.toLowerCase().includes(search.toLowerCase())) {
        return country
      }
    })

    const handleCountry = (country) => {
      handleSearch(country)
    }

    return (
      <>
        {
          (tmpCountries.length < 10) ?
            (tmpCountries.length === 1) ?
              <Country name={tmpCountries[0]}></Country>
              : tmpCountries.map(country => {
                return <h1 key={country}>{country}  <button onClick={() => handleCountry(country)}>show</button></h1>
              })
            : <p>Too many matches, specify another filter</p>
        }
      </>
    )
  }
  return (
    <>
      {
        (search) ?
          (
            searchCountries()
          )
          : null
      }
    </>
  )
}

function App() {
  const [search, setSearch] = useState('');
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <label htmlFor='country' style={{ margin: '2px' }}>find countries</label>
        <input id='country' name="country" placeholder="Enter a country" type="text" value={search} onChange={(e) => setSearch(e.target.value)}></input>
      </div>
      <CountryFilter search={search} handleSearch={setSearch}></CountryFilter>
    </>
  )
}

export default App
