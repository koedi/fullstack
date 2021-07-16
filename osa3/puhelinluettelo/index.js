const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456",
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/', (req, res) => {
    res.send("hello world!")
})


app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${Date()}`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)

    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const person = req.body

    if (!req.body.name) {
        console.log("app.post(): no name")
        res.status(400).json({error: 'name is missing'})
        return
    }
    if (!req.body.number) {
        console.log("app.post(): no number")
        res.status(400).json({error: 'number is missing'})
        return
    }
    console.log(persons.some(p => p.name === req.body.name))
    if (persons.some(p => p.name === req.body.name)) {
        console.log("app.post(): an entry exists for: ", req.body.name)
        res.status(400).json({error: 'an entry exists for that name'})
        return
    }

    const maxId = persons.length > 0 ? Math.max(...persons.map(p => p.id)) : 0
    person.id = maxId + 1

    persons = persons.concat(person)

    console.log("app.post(): created new entry:", person)
    res.json(person)
})




const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})




