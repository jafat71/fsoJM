import { useEffect, useState } from 'react'

import React from 'react';
import axios from 'axios'

import phonebooksService from './services/phonebooks.js'

const Filter = ({ pattern, handleChange }) => {
  return (
    <div>
      <label htmlFor='filter'>filter shown with: </label>
      <input id="filter" name="filter" type="text" value={pattern} onChange={(e) => handleChange(e.target.value)}></input>
    </div>
  );
}

const Form = ({ handleFormSubmit, newName, newNumber, handleNewName, handleNewNumber }) => {
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor='name'>Name: </label>
        <input id="name" type="text" name="name" value={newName} onChange={(e) => handleNewName(e.target.value)} required></input>
        <label htmlFor='number'>Number: </label>
        <input id="number" type="number" name="number" value={newNumber} onChange={(e) => handleNewNumber(e.target.value)} required></input>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const PersonFilter = ({ persons, pattern, handleDelete }) => {
  return (
    <>
      {
        persons.map((person) => {
          if (person.name.toLowerCase().startsWith(pattern.toLowerCase())) {
            return <p key={person.name}>{person.name} {person.number} <button onClick={() => handleDelete(person.id)} style={{ color: 'blue' }}>delete</button></p>
          }
        })
      }
    </>
  )
}

const Notificate = ({ message, color }) => {
  return (
    <>
      {message !== '' ? (
        <h3 style={{ color: 'white', backgroundColor: color, padding: 5 }}>
          {message}
        </h3>
      ) : null}

    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [pattern, setPattern] = useState('')
  const [notification, setNotification] = useState('');
  const [color, setColor] = useState('green');
  const [idCounter, setIdCounter] = useState(persons.length);


  useEffect(() => {
    phonebooksService.getAll()
      .then((persons) => {
        setPersons(persons)
      })
      .catch((error) => console.log("Error: " + error))
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
      id: idCounter
    }
    const personExists = persons.find(person => person.name === newPerson.name);
    try {
      if (personExists) {
        phonebooksService.update(personExists.id, { ...newPerson, number: newNumber })
          .then((person) => {
            let updatedPersons = persons.filter(p => p.id !== person.id)
            setPersons(updatedPersons.concat(person))
            setNewName('')
            setNewNumber('')
            setNotification("Updated " + person.name + " succesfully!")
            setTimeout(() => {
              setNotification('')
            }, 5000)
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
                setNotification("Information of " + personExists.name + " has already been removed from the server");
            } else {
                // Otros errores, muestra un mensaje genérico
                setNotification("Error on update.");
            }
            setColor('red');
            setTimeout(() => {
                setNotification('');
                setColor('green');
            }, 5000);
          })
      } else {
        phonebooksService.create(newPerson)
          .then(newPerson => {
            const updatesPersons = persons.concat(newPerson)
            setPersons(updatesPersons)
            setNewName('')
            setNewNumber('')
            setNotification("Added " + newPerson.name + " succesfully!")
            setTimeout(() => {
              setNotification('')
            }, 5000)
            setIdCounter(idCounter + 1);
          }).catch((error) => {
            setNotification("ERROR ON CREATE: " + newPerson.name + " cannot be created :(")
            setColor('red')
            setTimeout(() => {
              setNotification('')
              setColor('green')
            }, 5000)
          })
      }
    } catch (error) {
      setNotification("ERROR ON CREATE")
      setColor('red')
      setTimeout(() => {
        setNotification('')
        setColor('green')
      }, 5000)
    }
  }

  const deleteOnePerson = (id) => {

    phonebooksService.deletePerson(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        setNotification("Deleted succesfull!")
        setTimeout(() => {
          setNotification('')
          setColor('green')
        }, 5000)
        setIdCounter(idCounter - 1);
      })
      .catch((error) => {
        setNotification("ERROR ON DELETE")
        setColor('red')
        setTimeout(() => {
          setNotification('')
          setColor('green')
        }, 5000)
      });

  }



  return (
    <div>
      <h2>Phonebook</h2>
      <Notificate message={notification} color={color}></Notificate>
      <Filter pattern={pattern} handleChange={setPattern}></Filter>
      <h2>ADD A NEW:</h2>
      <Form handleFormSubmit={handleFormSubmit}
        newName={newName}
        newNumber={newNumber}
        handleNewName={setNewName}
        handleNewNumber={setNewNumber}></Form>
      <h2>Numbers</h2>
      ...
      <div>debug: {newName}</div>
      <div>
        <PersonFilter persons={persons} pattern={pattern} handleDelete={deleteOnePerson}></PersonFilter>
      </div>
    </div>
  )
}

export default App