require('dotenv').config()
const { request } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Entry = require('./models/entry')

const app = express()

// Middleware
app.use(express.json())
//app.use(express.static('build'))

// ** configure morgan to show extra info for POST
morgan.token('post', (request, response) => {
    if(request.method === "POST") {
        return JSON.stringify(request.body)
    } else {
        return ""
    }
})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :post"))

app.use(cors())

/*
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
*/

app.get('/api/persons', (req, res) => {
    Entry.find({}).then(entries => {
        res.json(entries)
    })
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
    Entry.findByIdAndRemove(req.params.id)
    .then(entry => {
        res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({error: 'name is missing'})        
    } else if (!req.body.number) {
        return res.status(400).json({error: 'number is missing'})
    } /*else if (persons.some(p => p.name === req.body.name)) {    "number": "555-4233"
        return res.status(400).json({error: 'an entry exists for that name'})
    }*/

    const entry = new Entry( {
        name: req.body.name,
        number: req.body.number
    })

    entry.save().then(result => {
        console.log('number saved')
    })

    res.json(entry)
})




const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})




