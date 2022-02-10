const express = require('express')
const router = express.Router()
const Employee = require('../models/employee')

// Getting all employees
router.get('/', async(req, res) => {
    try{
        const employees = await Employee.find()
        res.json(employees)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

// Getting an employee
router.get('/:id', getEmployee, (req, res) => {
    res.json(res.employee)
})

// Getting an employee with his project
router.get('/join/:id', getEmployee, (req, res) => {
    /*res.employee.populate('Project_id').exec((err, user) => {
        if(err) return handleError(err);
        res.json(res.employee.Project_id.body)
    })*/
    Employee.findOne({ _id: req.params.id })
    .populate('Project_id').exec((err, info) => {
        if(err){return console.error(err);}
        res.json(info)
        
    })
})

// Adding an employee
router.post('/', async(req, res) => {
    const employee = new Employee({
        Name: req.body.Name,
        Adress: req.body.Adress,
        Email: req.body.Email,
        Hire_date: req.body.Hire_date,
        Salary: req.body.Salary,
        Job_title: req.body.Job_title,
        Project_id: req.body.Project_id
    })

    try{
        const newEmployee = await employee.save()
        res.status(201).json(newEmployee)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

// Updating an employee
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
    if(req.body.Project_id != null){
        res.employee.Project_id = req.body.Project_id
    }
    try{
        const updatedEmployee = await res.employee.save()
        res.json(updatedEmployee)
    } catch(err){
        res.status(400).json({message: err.message})
    }
})

// Deleting an employee
router.delete('/:id', getEmployee, async (req, res) => {
    try {
      await res.employee.remove()
      res.json({ message: 'Employee Deleted' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

// Get employee by id
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