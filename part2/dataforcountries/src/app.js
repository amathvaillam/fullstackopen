import React,{useEffect, useState} from 'react'
import axios from 'axios'

const ToManyCountries = () => <p>Too many matches, specify another filter</p>
const NoCountry = () => <p>No result</p>
const Countries = ({shown, handleChangeFilter}) =>
shown.map(({name},i) =>
<p key={i}>{name}<button onClick={() => handleChangeFilter(name)}>show</button></p>)

  const SingleCountry = ({country}) => {
    const[weather, setWeather] = useState('')

    useEffect(() => {
      const api_key = process.env.REACT_APP_API_KEY
      console.log(api_key)
      axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      .then(response => {setWeather(response.data)})
    },[])
    let weatherHTML = 'loading... datas'
    if(weather)
      weatherHTML = (
      <>
      <h2>Weather in {country.capital}</h2>
      <p><b>temperature:</b> {weather.current.temperature}</p>
      <img src={weather.current.weather_icons[0]}/>
      <p><b>wind:</b> {weather.current.speed} direction {weather.current.wind_dir}</p>
      </>
    )
    return(
      <>
      <h2>{country.name}</h2>
      <h3>languages</h3>
      <ul>{country.languages.map(({name},i) => <li key={i}>{name}</li>)}</ul>
      <img src={country.flag} width='100px' height='100px'/>
      {weatherHTML}
      </>

  )
}
const App = () => {
  const [countries, setCountries] = useState([])
  const [shown, setShown] = useState([])
  const [ toFilter, setToFilter ] = useState('')

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {setCountries(response.data)})
  }, [])
  const triggerShow = (value, collection) =>{
    let toShow = collection.concat().filter(({name}) => name.includes(value))
    setShown(toShow)
  }
  const handleChangeFilter = (event) => {
    const data = !event.target ? event : event.target.value
    triggerShow(data, countries)
    setToFilter(data)
  }
  return (
    <div>
      <p>find countries<input value={toFilter} onChange={handleChangeFilter}/></p>
      {shown.length < 10 && shown.length >= 1
        ? (shown.length === 1
          ? <SingleCountry country={shown[0]}></SingleCountry>
          : <Countries shown={shown} handleChangeFilter={handleChangeFilter}></Countries>
      )
      : (shown.length === 0 && toFilter.length >= 1
        ? <NoCountry></NoCountry>
        : <ToManyCountries></ToManyCountries>)
      }
    </div>
  )
}
export default App
