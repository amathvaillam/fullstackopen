import React,{useEffect, useState} from 'react'
import axios from 'axios'

const ToManyCountries = () => <p>Too many matches, specify another filter</p>
const Countries = ({shown}) => shown.map(({name}) => <p>{name}</p>)
const SingleCountry = ({country}) => {
  return(
    <>
    <h2>{country.name}</h2>
    <h3>languages</h3>
    <p><ul>{country.languages.map(({name}) => <li>{name}</li>)}</ul></p>
    <img src={country.flag} width='100px' height='100px'/>
    </>

)
}
const App = () => {
  const [countries, setCountries] = useState([])
  const [shown, setShown] = useState([])
  const [ toFilter, setToFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => { console.log(response.data);setCountries(response.data)})
  }, [])
  const triggerShow = (value, collection) =>{
    let toShow = collection.concat().filter(({name}) => name.toLowerCase().includes(value))
    setShown(toShow)
  }
  const handleChangeFilter = (event) => {
    triggerShow(event.target.value, countries)
    setToFilter(event.target.value)
  }
  return (
    <div>
      <p>find countries<input value={toFilter} onChange={handleChangeFilter}/></p>
      {shown.length < 10 && shown.length >= 1
        ? (shown.length === 1
          ? <SingleCountry country={shown[0]}></SingleCountry>
          : <Countries shown={shown}></Countries>
      )
      : <ToManyCountries></ToManyCountries>
  }
</div>
)
}
export default App
