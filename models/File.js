const mongoose = require("mongoose")
const Schema = mongoose.Schema

const FileSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    
    lastName: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        required: true,
        unique: true
    },
    
    address: {
        type: String
    },
    
    company: {
        type: String,
        required: true
    },
    
    salary: {
        type: Number,
        required: true
    },
    
    timestamp : {
        type: String
    }
})

module.exports = File = mongoose.model('file', FileSchema)