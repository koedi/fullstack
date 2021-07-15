const Phonebook = ({ persons, searchTerm }) => {
    return (
        <div>
            {persons
                .filter(person => (person.name.toLowerCase()).includes(searchTerm.toLowerCase()))
                .map(person => <p key={person.id}>{person.name} {person.number}</p>)
            }
        </div>
    )
}

export default Phonebook