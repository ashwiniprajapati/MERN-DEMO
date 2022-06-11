const res = require('express/lib/response');
const Employee = require('../models/Employee');

module.exports = {
    addEmp: async(req, res) => {
        try {
            
            let reqData = req.body;
            let addEmp =  new Employee(reqData);
            let result = await addEmp.save();

            res.status(200).send({
                status: true,
                msg: 'Employee added.',
                data: result
            })
        } catch (error) {
            res.send({
                status: false,
                msg: `Error: ${error.message}`,
            })
        }
    },

    getEmps: async (req, res) => {
        try {
            let employees = await Employee.find({});
            res.status(200).send({
                status: true,
                msg: 'Employee list.',
                data: employees
            })
        } catch (error) {
            res.send({
                status: false,
                msg: `Error: ${error.message}`,
            })
        }
    },

    updateEmp: async (req, res) => {
        try {
            let empId = req.body._id;
            let employees = await Employee.updateOne({_id: empId},req.body);
            let updatedEmpdata = await Employee.find({});
            res.status(200).send({
                status: true,
                msg: 'Employee updated.',
                data: updatedEmpdata
            })
        } catch (error) {
            res.send({
                status: false,
                msg: `Error: ${error.message}`,
            })
        }
    },

    deleteEmp: async (req, res) => {
        try {
            let empId = req.params.id;
            let employees = await Employee.deleteOne({_id: empId});
            res.status(200).send({
                status: true,
                msg: 'Employee deleted.',
                data: employees
            })
        } catch (error) {
            res.send({
                status: false,
                msg: `Error: ${error.message}`,
            })
        }
    }
}