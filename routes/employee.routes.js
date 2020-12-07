const express = require('express')
const router = express.Router()
const employees = require('../controllers/employee.controller.js');
const validateEmployee = require('../validator/employee.validator.js');


router.post('/', validateEmployee.validate, employees.create);

router.get('/', employees.findAll);

router.get('/:empId', employees.findOne);

router.put('/:empId', employees.update);

router.delete('/:empId', employees.delete);

module.exports = router;