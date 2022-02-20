import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Form, Button as Buttonn} from 'react-bootstrap'

import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import { useStateIfMounted } from 'use-state-if-mounted';

import Axios from 'axios';

export const AddEmployeeModal = ({modifyEmpAddedData}) => {
  const [lgShow, setLgShow] = useStateIfMounted(false);
  //const [input, setInput] = useState([]);
  const [ok, setOk] = useStateIfMounted(0);
  var input = {};
  let i = 1;

  // Project Dropdown
  const [project, setProject] = useStateIfMounted('');
  const [projects, setProjects] = useStateIfMounted([]);

  const handleChange = (event) => {
    setProject(event.target.value);
  };

  async function addEmployee(){
    let toBeUpdated = {};
    if(typeof(input.Name) != "undefined")toBeUpdated["Name"] = input.Name;else return;
    if(typeof(input.Adress) != "undefined")toBeUpdated["Adress"] = input.Adress;else return;
    if(typeof(input.Email) != "undefined")toBeUpdated["Email"] = input.Email;else return;
    if(typeof(input.Hire_date) != "undefined")toBeUpdated["Hire_date"] = input.Hire_date;else return;
    if(typeof(input.Salary) != "undefined")toBeUpdated["Salary"] = input.Salary;else return;
    if(typeof(input.Job_title) != "undefined")toBeUpdated["Job_title"] = input.Job_title;else return;
    if(typeof(project) != "undefined")toBeUpdated["Project_id"] = project;else return;


  Axios.post(`http://localhost:3000/employees/`, toBeUpdated).then((response) => {
        setOk(1);
        modifyEmpAddedData(toBeUpdated);
        setLgShow(false)
      }).catch((error) => {setOk(2);console.log(error);});
  }

  useEffect(()=>{
    Axios.get('http://localhost:3000/projects', {headers: {'x-access-token': localStorage.getItem('token')}}).then(res => {
      let temp = [];
      for(let i = 0; i < res.data.length; i++)
        temp.push({"id": res.data[i]._id, "name": res.data[i].Project_name});

      
        setProjects(temp);
      
    }).catch((error) => {console.log("No projects found!");localStorage.setItem('tokenAvailable', false)})
  }, []);

  return (
    <>
    <Button variant="contained" color="success" onClick={() => setLgShow(true)}>Add an Employee</Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Add an Employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="Name"
          placeholder="Name"
          onInput={e => {input.Name = e.target.value;}}
        />
        <TextField
          required
          id="filled-required"
          label="Hire Date"
          placeholder="Hire Date (MM.DD.YYYY)"
          onInput={e => {input.Hire_date = e.target.value;}}
        />
        <TextField
          id="outlined-number"
          label="Salary"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{step: "50"}}
          onInput={e => {input.Salary = e.target.value;}}
        />
        <TextField
          required
          id="outlined-required"
          label="Job Title"
          placeholder="Job Title"
          onInput={e => {input.Job_title = e.target.value;}}
        />
        <TextField
          required
          id="outlined-required"
          label="Email"
          placeholder="Email"
          onInput={e => {input.Email = e.target.value;}}
        />
        <TextField
          required
          id="outlined-required"
          label="Address"
          placeholder="Address"
          onInput={e => {input.Adress = e.target.value;}}
        />
</div>
    </Box>

          <div>
          <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Project</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={project}
            label="Project"
            onChange={handleChange}
          >
            {projects.map((data) => (
              <MenuItem value={data.id}>{data.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      </div>
          <div class='d-flex justify-content-center'>
          <Buttonn size='lg' variant="primary mt-3 ml-5" onClick={() => {addEmployee()}}>
            Submit
          </Buttonn>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}