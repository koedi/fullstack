import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import Phonebook from './components/Phonebook'
import PersonForm from './components/PersonForm'

const App = () => {
    const [persons, setPersons] = useState([''])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredPersons, setFilteredPersons] = useState([''])

    useEffect( () => {
        axios
        .get('http://localhost:3001/persons')
        .then(response => {
            setPersons(response.data)
            setFilteredPersons(response.data)
        })
    }, [])



    const addInfo = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber,
            id: newName
        }

        if (persons.some(p => p.name === newName)) {
            alert(`${newName} is already added to phonebook`)
            return
        }

        setPersons(persons.concat(personObject))
        setFilteredPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
    }


    const filterPersons = (event) => {
        setFilteredPersons(persons.filter(p => (p.name.toLowerCase()).includes(event.target.value.toLowerCase())))
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value)
        filterPersons(event)
    }



    return (
        <div>
            <h2>Phonebook</h2>
            <Filter searchTerm={searchTerm} handleSearchTermChange={handleSearchTermChange} />
        
            <h2>Add new number</h2>
            <PersonForm addInfo={addInfo} newName={newName} newNumber={newNumber} 
            handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />

            <h2>Numbers</h2>
            <Phonebook filteredPersons={filteredPersons}/>
        </div>
    )
}









export default App