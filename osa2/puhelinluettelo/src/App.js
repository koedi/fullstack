import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-1231244', show: true },
        { name: 'Ada Lovelace', number: '39-44-5323523', show: true },
        { name: 'Dan Abramov', number: '12-43-234345', show: true },
        { name: 'Mary Poppendieck', number: '39-23-6423122', show: true },
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

    const addInfo = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber,
            show: true
        }

        if (persons.some(p => p.name === newName)) {
            alert(`${newName} is already added to phonebook`)
            return
        }

        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
    }


    const filterPersons = (event) => {
        /** 
         * 1) set all persons to show=false i.e. not to show
         * 2) filter person list with search term
         * 3) set filtered list to show=true i.e. to show
         * 
        */
        persons.map(p => p.show = false)
        const filteredPersons = persons.filter(p => (p.name.toLowerCase()).includes(event.target.value.toLowerCase()))
        filteredPersons.map(p => p.show = true)
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
            <Phonebook persons={persons} />

        </div>
    )
}


const Filter = ({searchTerm, handleSearchTermChange}) => {
    return(
        <div>
            filter shown with: <input value={searchTerm} onChange={handleSearchTermChange}></input>
        </div>
    )
}

const PersonForm = (props) => {
    return (
        <form onSubmit={props.addInfo}>
        <div>
            name:   <input value={props.newName} onChange={props.handleNameChange}/><br/>
            number: <input value={props.newNumber} onChange={props.handleNumberChange}/>
        </div>
        <div>
            <button type="submit" >add</button>
        </div>
    </form>    )
}


const Phonebook = ({persons}) => {
    return(
        <div>
            {persons.filter(p => p.show === true).map(p => <p key={p.name}> {p.name} {p.number}</p>)}
        </div>
    )
}


export default App