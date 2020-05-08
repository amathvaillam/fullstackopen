import React, { useState } from 'react'

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

  const handleChangeFilter = (event) => {
    let toShow = persons.concat().filter(({name}) => name.toLowerCase().includes(event.target.value))
    setShown(toShow || persons)
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
    persons.some((element) => element.name === newName) === true
    ? alert(`${newName} is already added to phonebook`)
    : setPersons(persons.concat({name:newName, number:newNumber}))
  }

  return (
    <div>
    <h2>Phonebook</h2>
    <div>
    filter shown with<input  value={toFilter} onChange={handleChangeFilter} />
    </div>
    <h2>add a new</h2>
    <form onSubmit={handleSubmit}>
    <div>
    name: <input  value={newName} onChange={handleChangeName} />
    </div>
    <div>
    number: <input  value={newNumber} onChange={handleChangeNumber} />
    </div>
    <div>
    <button type="submit" >add</button>
    </div>
    </form>
    <h2>Numbers</h2>
    {shown.map(({name, number}) => <p>{name} {number}</p>)}
    </div>
  )
}

export default App
