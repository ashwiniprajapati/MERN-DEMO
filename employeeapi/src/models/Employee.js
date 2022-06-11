const mongoose = require('mongoose');

const EmpScheema = mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    contact: {
        type: Number,
        required: true,
        unique:true
    },
    address: {
        type: String
    }
})
module.exports = mongoose.model('Employees', EmpScheema);