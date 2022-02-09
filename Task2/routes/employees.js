const express = require('express')
const router = express.Router()
const Employee = require('../models/employee')

// Getting all
router.get('/', async(req, res) => {
    try{
        const employees = await Employee.find()
        res.json(employees)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

// Getting one
router.get('/:id', getEmployee, (req, res) => {
    res.json(res.employee)
})

// Creating one
router.post('/', async(req, res) => {
    const employee = new Employee({
        Name: req.body.Name,
        Adress: req.body.Adress,
        Email: req.body.Email,
        Hire_date: req.body.Hire_date,
        Salary: req.body.Salary,
        Job_title: req.body.Job_title
    })

    try{
        const newEmployee = await employee.save()
        res.status(201).json(newEmployee)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

// Updating one
router.patch('/:id', getEmployee, async (req, res) => {
    if(req.body.Name != null){
        res.employee.Name = req.body.Name
    }
    if(req.body.Adress != null){
        res.employee.Adress = req.body.Adress
    }
    if(req.body.Email != null){
        res.employee.Email = req.body.Email
    }
    if(req.body.Hire_date != null){
        res.employee.Hire_date = req.body.Hire_date
    }
    if(req.body.Salary != null){
        res.employee.Salary = req.body.Salary
    }
    if(req.body.Job_title != null){
        res.employee.Job_title = req.body.Job_title
    }
    try{
        const updatedEmployee = await res.employee.save()
        res.json(updatedEmployee)
    } catch(err){
        res.status(400).json({message: err.message})
    }
})

// Deleting one
router.delete('/:id', getEmployee, async (req, res) => {
    try {
      await res.employee.remove()
      res.json({ message: 'Employee Deleted' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

async function getEmployee(req, res, next){
    let employee
    try{
        employee = await Employee.findById(req.params.id)
        if(employee == null){
            return req.status(404).json({message: 'Connot find employee'})
        }
    } catch(err){
        return res.status(500).json({message: err.message})
    }

    res.employee = employee
    next()
}

module.exports = router