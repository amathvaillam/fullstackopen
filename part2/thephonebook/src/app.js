import React, { useState, useEffect } from 'react'
import personServices from './services/persons'
import './app.css'

const Filter = ({toFilter, handleChangeFilter}) =>
(<div>filter shown with<input  value={toFilter} onChange={handleChangeFilter} /></div>)

const Notification = ({ message, classname }) => message === null
? null
: <div className={classname}>{message}</div>

const PersonForm = ({handleSubmit, newName, handleChangeName, newNumber, handleChangeNumber}) => (
  <form onSubmit={handleSubmit}>
    <div>name: <input  value={newName} onChange={handleChangeName} /></div>
    <div>number: <input  value={newNumber} onChange={handleChangeNumber} /></div>
    <div><button disabled={!newName.length || !newNumber.length}type="submit" >add</button></div>
  </form>
)

const Persons = ({shown, handleDelete}) =>
shown.map(({name, number, id}) => {
  return (
    <p key={id}>{name} {number}
      <button onClick={(event) => {
          if(window.confirm('Delete '+name+' ?'))
          handleDelete(id)
        }}>delete</button>
      </p>
    )
  })

  const App = () => {
    const [ persons, setPersons ] = useState([])
    const [ shown, setShown ] = useState(persons)

    const [ toFilter, setToFilter ] = useState('')
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNumber ] = useState('')
    const [ message, setMessage ] = useState('')
    const [ classname, setClassname ] = useState('')

    const success = (nature, name, number='') => {
      let message = nature === 'name'
      ? 'Added '+name
      : `Changed number ${number} of ${name}`
      setClassname('success')
      setMessage(message)
      window.setTimeout(() => {setMessage(null)},2000)
    }

    const getAll = () => {
      personServices.getAll()
      .then(persons => {
        setPersons(persons)
        setShown(persons)
      })
    }
    useEffect(() => { getAll() }, [])

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
      let newObject = {name:newName, number:newNumber};
      let exist = persons.some((element) => element.name === newName) === true
      if(exist && window.confirm(`${newName} is already added to phonebook, replace the older number
        with a new one?`)){
          let id = persons.filter((element) => element.name === newName)[0].id
          personServices.update(id, newObject)
          .then(response => {
            success('number',newName ,newNumber)
            getAll()
          })
          .catch(error => {
            console.log('fail')
          })
        }
        else{
          personServices.create(newObject)
          .then(response => {
            success('name',newName)
            getAll()
          })
          .catch(error => {
            console.log(error)
          })
        }
      }

      const handleDelete = (id) => {
        personServices.remove(id)
        .then(response => {getAll()})
        .catch(error => {
          console.log('fail')
        })
      }

      return (
        <div>
          <h2>Phonebook</h2>
          <Notification message={message} classname={classname}></Notification>
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
          <Persons shown={shown} handleDelete={handleDelete}></Persons>
        </div>
      )
    }

    export default App
