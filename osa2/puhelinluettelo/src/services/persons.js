import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

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


const remove = (id) => {
    console.log(id, "deleting this")
    const request = axios.delete(baseUrl.concat("/",id))
    return request.then(response => response.data)
}

const exportObject = {
    getAll: getAll,
    getOne: getOne,
    create: create,
    remove: remove,
}

export default exportObject