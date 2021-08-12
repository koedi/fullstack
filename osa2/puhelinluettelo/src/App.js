import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import Phonebook from './components/Phonebook'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

import personsService from './services/persons'

import './App.css'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [notification, setNofitication] = useState({message: null, status: null})

    useEffect( () => {
        personsService.getAll().then(initialPersons => setPersons(initialPersons))
    }, [])


    const addInfo = (event) => {
        event.preventDefault()

        if (newName === '' || newNumber === '') {
            showNotification("name or number is empty.", "error")
            return
        }

        const personObject = {
            name: newName,
            number: newNumber,
        }

        // update info
        if (persons.some(p => p.name === newName)) {
            const person = persons.find(p => p.name === newName)
            
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                personsService
                    .update(person, newNumber)
                    .then(updatedPerson => {
                        setPersons(
                            persons.map(p => p.name === person.name ? updatedPerson : p)
                        )
                    })
                    .catch(error => {
                        const list = persons.filter(p => p.id !== person.id) //filter out deleted id
                        setPersons(list)
                        showNotification(`${person.name} has already been deleted. Update failed.`, "error")
                    })

                showNotification(`Updated ${person.name}'s number.`, "ok")
                setNewName('')
                setNewNumber('')
                return
            } else {
                return
            }
        }
        
        personsService
        .create(personObject)
        .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            showNotification(`Added ${newName}.`, "ok")    
            setNewName('')
            setNewNumber('')
        })
        .catch(error => {
            showNotification(error.message, 'error')
        })

    }

    const deleteInfo = (id) => {
        const person = persons.find(p => p.id === id)
        if (window.confirm(`Delete ${person.name}`)) {
            personsService.remove(id).then(() => {
                const list = persons.filter(p => p.id !== id) //filter out deleted id
                setPersons(list)
            })
            showNotification(`Removed ${person.name}`, "ok")
        }
    }

    const showNotification = (message, status) => {
        setNofitication({message: message, status: status})
        setTimeout(() => setNofitication({message: null, status: null}), 4000)
    }


    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value)
    }



    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notification.message} className={notification.status} />
            <Filter searchTerm={searchTerm} handleSearchTermChange={handleSearchTermChange} />
        
            <h2>Add new number</h2>
            <PersonForm addInfo={addInfo} newName={newName} newNumber={newNumber} 
            handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />

            <h2>Numbers</h2>
            <Phonebook persons={persons} searchTerm={searchTerm} deleteInfo={deleteInfo} />
        </div>
    )
}

export default App