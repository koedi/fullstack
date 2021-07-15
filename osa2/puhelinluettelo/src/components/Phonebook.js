const Phonebook = ({ persons, searchTerm, deleteInfo }) => {
    return (
        <div>
            {persons
                .filter(person => (person.name.toLowerCase()).includes(searchTerm.toLowerCase()))
                .map(person =>
                    <div key={person.id}>
                        <p >{person.name} {person.number} {" "}
                        <button onClick={() => deleteInfo(person.id)}>delete</button>
                        </p>
                    </div>

                )
            }
            
        </div>
    )
    //                
}

export default Phonebook