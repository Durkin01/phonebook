import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState({message: null, type: null})

  useEffect(() => {
    personsService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    const noRepeatedNames = persons.every(person => person.name != newName)
    if (!noRepeatedNames) {
      if (!window.confirm("this name is already in the phonebook, would you like to replace the old phone number with a new one?"))
      {}
      else {
        const person = persons.find(p => p.name == newName)
        const changedPerson = { ...person, number: newNumber }
        personsService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map( p => p.id === person.id ? changedPerson : p ))
            setNotificationMessage( {message: 
            `Person '${person.name}' phone number has been updated `, 
            type: 'green'}
            )
            setTimeout(() => {
              setNotificationMessage({message: null, type: null})
            }, 5000)
          })
          .catch(error => {
            setNotificationMessage({ message:
            `Note '${person.name}' was already removed from server`,
            type: 'red'}
            )
            setTimeout(() => {
              setNotificationMessage({message: null, type: null})
            }, 5000)
            setPersons(persons.filter(p => p.id !== person.id))
          })
      }}
    else {
    const personObject = {
      name: newName,
      number: newNumber
    }
    personsService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotificationMessage( {message: 
          `Person '${personObject.name}' had been added to the phonebook`,
          type: 'green' }
          )
          setTimeout(() => {
            setNotificationMessage({message: null, type: null})
          }, 5000)
      })
    }
  }

  const deletePerson = (id) => {
    personsService
      .deleteObject(id)
      .then(() => {
        setPersons(persons.filter( (person) => person.id !== id))
      })
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  } 

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  
  const filterNames = (event) => {
    console.log(event.target.value)
    setNameFilter(event.target.value)
  }

  const personsToShow = () => {
    function prefixMatch(person) {
      for (let i = 0; i < nameFilter.length; i++) {
        if (person.name[i] != nameFilter[i]) {
          return false
        }
      }
      return true
    }    
    const filteredPersons = persons.filter(person => prefixMatch(person))
    return filteredPersons
  }

  // !!! Notifications need to change green/red based on type

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} /> 
      <Filter value={nameFilter} onChange={filterNames} />

      <h2> add a new </h2>
      <PersonForm onSubmit={addPerson} valueName={newName} onNameChange={handleNameChange} 
                  valueNumber={newNumber} onNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
        <Persons filterPersons={personsToShow} onClick={deletePerson}/>
    </div>
  )
}

export default App