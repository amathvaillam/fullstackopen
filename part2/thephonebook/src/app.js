import React, { useState } from 'react'

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
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ shown, setShown ] = useState(persons)

  const [ toFilter, setToFilter ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNumber ] = useState('')

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
