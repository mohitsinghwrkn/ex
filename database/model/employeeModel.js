const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// List of columns for Employee schema
let employee_schema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    }
}, {
    collection: 'employeeCollection'
});

module.exports = mongoose.model('employee_collection', employee_schema);
