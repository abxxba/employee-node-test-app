const mongoose = require("mongoose");
const EmployeeSchema = require("../models/employee.model.js");

var employee = mongoose.model("employees");

exports.create = (req, res) => {
  const newEmployee = new EmployeeSchema(req.body);
  newEmployee
    .save()
    .then((data) => {
      res.json({});
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something went wrong creating new employee.",
      });
    });
};

exports.findAll = (req, res) => {
  employee
    .find()
    .sort({ createdAt: -1 })
    .then((employees) => {
      res.json(employees);
    })
    .catch((error) => {
      return res.status(500).send({
        message: "Something went wrong fetching employees",
      });
    });
};

exports.findOne = (req, res) => {
  employee
    .findById(req.params.empId)
    .then((employee) => {
      res.json(employee);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          message: "Employee not found with id " + req.params.empId,
        });
      }
      return res.status(500).send({
        message: "Something went wrong fetching employee",
      });
    });
};

exports.update = (req, res) => {
  employee
    .findByIdAndUpdate(req.params.empId, req.body, { new: true })
    .then((employee) => {
      if (!employee) {
        return res.status(404).send({
          message: "employee not found with id " + req.params.empId,
        });
      }
      res.send(employee);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "employee not found with id " + req.params.empId,
        });
      }
      return res.status(500).send({
        message: "Error updating employee with id " + req.params.empId,
      });
    });
};

exports.delete = (req, res) => {
  employee
    .findByIdAndRemove(req.params.empId)
    .then((employee) => {
      if (!employee) {
        return res.status(404).send({
          error: "employee not found with id " + req.params.empId,
        });
      }
      res.send({ message: "employee deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          error: "employee not found with id " + req.params.empId,
        });
      }
      return res.status(500).send({
        error: "Could not delete employee with id " + req.params.empId,
      });
    });
};
