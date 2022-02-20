import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Form, Button as Buttonn} from 'react-bootstrap'

import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import { useStateIfMounted } from 'use-state-if-mounted'

import Axios from 'axios';

export const AddProjectModal = ({modifyProjAddedData}) => {
  const [lgShow, setLgShow] = useStateIfMounted(false);
  //const [input, setInput] = useState([]);
  const [ok, setOk] = useStateIfMounted(0);
  var input = {};

  async function addProject(){
    let toBeUpdated = {};
    if(typeof(input.Project_name) != "undefined")toBeUpdated["Project_name"] = input.Project_name;else return;
    if(typeof(input.Start_date) != "undefined")toBeUpdated["Start_date"] = input.Start_date;else return;
    if(typeof(input.Planned_end_date) != "undefined")toBeUpdated["Planned_end_date"] = input.Planned_end_date;else return;
    if(typeof(input.Description) != "undefined")toBeUpdated["Description"] = input.Description;else return;
    if(typeof(input.Project_code) != "undefined")toBeUpdated["Project_code"] = input.Project_code;else return;

    Axios.post(`http://localhost:3000/projects/`, toBeUpdated).then((response) => {
        setOk(1);
        modifyProjAddedData(toBeUpdated);
        setLgShow(false)
      }).catch((error) => {setOk(2);console.log(error);});
  }

  return (
    <>
    <Button variant="contained" color="success" onClick={() => setLgShow(true)}>Add a Project</Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Add a Project
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
          label="Project Name"
          placeholder="Project Name"
          onInput={e => {input.Project_name = e.target.value;}}
        />
        <TextField
          required
          id="filled-required"
          label="Start Date"
          placeholder="Start Date (MM.DD.YYYY)"
          onInput={e => {input.Start_date = e.target.value;}}
        />
        <TextField
          required
          id="outlined-required"
          label="End Date"
          placeholder="End Date (MM.DD.YYYY)"
          onInput={e => {input.Planned_end_date = e.target.value;}}
        />
        <TextField
          required
          id="outlined-required"
          label="Project Code"
          placeholder="Project Code"
          onInput={e => {input.Project_code = e.target.value;}}
        />
        <TextField
          required
          id="outlined-required"
          label="Description"
          placeholder="Description"
          onInput={e => {input.Description = e.target.value;}}
        />
    </div>
    </Box>
    <div class='d-flex justify-content-center'>
    <Buttonn size='lg' variant="primary mt-3 ml-5" onClick={() => {addProject()}}>
      Submit
    </Buttonn>
    </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

/*
<Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Project Name</Form.Label>
            <Form.Control type="text" placeholder="Project Name" onInput={e => {input.Project_name = e.target.value;}}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Start Date</Form.Label>
            <Form.Control type="text" placeholder="Start Date (MM.DD.YYYY)" onInput={e => {input.Start_date = e.target.value;}}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>End Date</Form.Label>
            <Form.Control type="text" placeholder="End Date (MM.DD.YYYY)" onInput={e => {input.Planned_end_date = e.target.value;}}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Project Code</Form.Label>
            <Form.Control type="text" placeholder="Project Code" onInput={e => {input.Project_code = e.target.value;}}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Description</Form.Label>
            <Form.Control type="text" placeholder="Description" onInput={e => {input.Description = e.target.value;}}/>
          </Form.Group>
          <Buttonn variant="primary" type="submit" onClick={() => {addProject()}}>
            Submit
          </Buttonn>
        </Form>*/