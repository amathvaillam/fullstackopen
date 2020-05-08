import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1234567'
    }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNumber ] = useState('')

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
    {persons.map(({name, number}) => <p>{name} {number}</p>)}
    </div>
  )
}

export default App
