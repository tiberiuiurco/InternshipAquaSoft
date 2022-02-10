const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    Project_name: {
        type: String,
        required: true
    },
    Start_date: {
        type: Date,
        required: true
    },
    Planned_end_date: {
        type: Date,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Project_code: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Projects', projectSchema)