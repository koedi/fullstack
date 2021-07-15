const Phonebook = ({persons, searchTerm}) => {
    
    if (searchTerm === '') {
        return (
            <div>
                {persons.map((person, i) => <p key={i}>{person.name} {person.number}</p>)}
            </div>
        )
    } else {
        return (
            <div>
                {persons
                .filter(person => (person.name.toLowerCase()).includes(searchTerm.toLowerCase()))
                .map(person => <p key={person.name}>{person.name} {person.number}</p> )
                }
            </div>
        )
    }
}

export default Phonebook