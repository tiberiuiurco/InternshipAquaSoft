const mongoose = require('mongoose')
var Schema = mongoose.Schema

const employeeSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Adress: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Hire_date: {
        type: Date,
        required: true,
        //default: Date.now
    },
    Salary: {
        type: Number,
        required: true
    },
    Job_title: {
        type: String,
        required: true
    },
    Project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projects',
        required: true
    },
})

module.exports = mongoose.model('Employees', employeeSchema)