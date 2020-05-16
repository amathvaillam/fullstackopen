import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({toFilter, handleChangeFilter},i) => (
  <div key={i}>
  filter shown with<input  value={toFilter} onChange={handleChangeFilter} />
  </div>
)
const PersonForm = (props) => (
  <form onSubmit={props.handleSubmit}>
  <div>
  name: <input  value={props.newName} onChange={props.handleChangeName} />
  </div>
  <div>
  number: <input  value={props.newNumber} onChange={props.handleChangeNumber} />
  </div>
  <div>
  <button type="submit" >add</button>
  </div>
  </form>
)
const Persons = ({shown}) => shown.map(({name, number},i) => <p key={i}>{name} {number}</p>)

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ shown, setShown ] = useState(persons)

  const [ toFilter, setToFilter ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNumber ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setShown(response.data)
      })
  }, [])

  const triggerShow = (value, collection) =>{
    let toShow = collection.concat().filter(({name}) => name.toLowerCase().includes(value))
    setShown(toShow)
  }
  const handleChangeFilter = (event) => {
    triggerShow(event.target.value, persons)
      setToFilter(event.target.value)
  }
  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }
  const handleChangeNumber = (event) => {
    setNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const updates = () =>{
      const newTab = persons.concat({name:newName, number:newNumber})
      setPersons(newTab)
      triggerShow(toFilter,newTab)
    }
    persons.some((element) => element.name === newName) === true
    ? alert(`${newName} is already added to phonebook`)
    : updates()

  }

  return (
    <div>
    <h2>Phonebook</h2>
    <Filter toFilter={toFilter} handleChangeFilter={handleChangeFilter}></Filter>
    <h2>add a new</h2>
    <PersonForm
    handleSubmit={handleSubmit}
    newName={newName}
    handleChangeName={handleChangeName}
    newNumber={newNumber}
    handleChangeNumber={handleChangeNumber}
    ></PersonForm>

    <h2>Numbers</h2>
    <Persons shown={shown}></Persons>
    </div>
  )
}

export default App
