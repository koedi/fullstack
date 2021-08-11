const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
//const url = `mongodb+srv://fsmongo:UXmiy@cluster0.q4ahp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

console.log('connecting to', url)
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true, useCreateIndex: true})
.then(result => {
    console.log('connected to MongoDB')
})
.catch((error) => {
    console.log('error connecting to MongoDB', error.message)
})
const entrySchema = new mongoose.Schema({
    name: String, 
    number: String
})
entrySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Entry', entrySchema)