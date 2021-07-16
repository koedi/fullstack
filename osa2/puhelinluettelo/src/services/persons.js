import axios from "axios";

//const baseUrl = 'http://localhost:3001/api/persons'
const baseUrl = 'api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getOne = (id) => {
    const request = axios.get(baseUrl.concat("/", id))
    return request.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (personObject, newNumber) => {
    const person = {...personObject, number: newNumber}
    const request = axios.put(baseUrl.concat("/", person.id), person)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(baseUrl.concat("/",id))
    return request.then(response => response.data)
}

const exportObject = {
    getAll: getAll,
    getOne: getOne,
    create: create,
    update: update,
    remove: remove,
}

export default exportObject