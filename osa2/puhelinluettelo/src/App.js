import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import Phonebook from './components/Phonebook'
import PersonForm from './components/PersonForm'

import personsService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

    useEffect( () => {
        personsService.getAll().then(initialPersons => setPersons(initialPersons))
    }, [])


    const addInfo = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber,
        }

        if (persons.some(p => p.name === newName)) {
            const person = persons.find(p => p.name === newName)
            
            window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
            personsService
            .update(person, newNumber)
            .then(updatedPerson => {
                setPersons(
                    persons.map(p => p.name === person.name ? updatedPerson : p)
                )
            })


            return
        }

        personsService.create(personObject).then(returnedPerson => setPersons(persons.concat(returnedPerson)))
        setNewName('')
        setNewNumber('')
    }

    const deleteInfo = (id) => {
        const person = persons.find(p => p.id === id)
        if (window.confirm(`Delete ${person.name}`)) {
            personsService.remove(id).then(() => {
                const list = persons.filter(p => p.id !== id) //filter our deleted id
                setPersons(list)
            })
        }
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