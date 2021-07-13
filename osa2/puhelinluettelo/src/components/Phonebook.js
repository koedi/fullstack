const Phonebook = ({filteredPersons}) => {
    return(
        <div>
            {filteredPersons.map((p, i) => <p key={i}>{p.name} {p.number}</p>)}
        </div>
    )
}

export default Phonebook