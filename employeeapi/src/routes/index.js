const express = require('express');
const router = express.Router();
const employeeController = require('../controller/employee.controller');

router.post('/addEmployee', employeeController.addEmp);
router.get('/', employeeController.getEmps);
router.put('/updateEmployee', employeeController.updateEmp);
router.delete('/deleteEmployee/:id', employeeController.deleteEmp);

module.exports = router;