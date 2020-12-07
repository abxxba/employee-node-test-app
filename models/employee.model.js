const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema({ name: { type: String }, dateOfBirth: { type: Date, default: Date.now }, gender: { type: String }, salary: { type: Number } }, {
    timestamps: true
});

module.exports = mongoose.model('employees', EmployeeSchema);