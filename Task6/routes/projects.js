const express = require('express')
const router = express.Router()
const Project = require('../models/project')
const Employee = require('../models/employee')
const { authJwt } = require("../middlewares");

// Getting all projects authJwt
router.get('/', authJwt, async(req, res) => {
    try{
        const projects = await Project.find()
        res.json(projects)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

// Getting a project
router.get('/:id', getProject, (req, res) => {
    res.json(res.project)
})

// Adding a project
router.post('/', authJwt, async(req, res) => {
    const project = new Project({
        Project_name: req.body.Project_name,
        Start_date: req.body.Start_date,
        Planned_end_date: req.body.Planned_end_date,
        Description: req.body.Description,
        Project_code: req.body.Project_code
    })

    try{
        const newProject = await project.save()
        res.status(201).json(newProject)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

// Updating an employee
router.patch('/:id', authJwt, getProject, async (req, res) => {
    if(req.body.Project_name != null){
        res.project.Project_name = req.body.Project_name
    }
    if(req.body.Start_date != null){
        res.project.Start_date = req.body.Start_date
    }
    if(req.body.Planned_end_date != null){
        res.project.Planned_end_date = req.body.Planned_end_date
    }
    if(req.body.Description != null){
        res.project.Description = req.body.Description
    }
    if(req.body.Project_code != null){
        res.project.Project_code = req.body.Project_code
    }
    try{
        const updatedProject = await res.project.save()
        res.json(updatedProject)
    } catch(err){
        res.status(400).json({message: err.message})
    }
})

// Deleting a project
router.delete('/:id', authJwt, getProject, async (req, res) => {
    var ok = 1;
    try {
      const employees = await Employee.find()
      for(const emp of employees){
        if(emp.Project_id == req.params.id){
            ok = 0;
            console.log("Found!");
            break;
        }
      }
      if(ok == 1){
        await res.project.remove()
        res.json({ message: 'Project Deleted' })
      }
      else{
        console.log("We could not delete the provided project!");
        res.status(400).json({message: 'We could not delete the provided project!'});
      }
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

// Get employee by id
async function getProject(req, res, next){
    let project
    try{
        project = await Project.findById(req.params.id)
        if(project == null){
            return req.status(404).json({message: 'Connot find project'})
        }
    } catch(err){
        return res.status(500).json({message: err.message})
    }

    res.project = project
    next()
}

module.exports = router