import React, { Component, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Form, Button as Buttonn} from 'react-bootstrap'

import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';

export const UpdateEmployeeModal = ({element, entry}) => {
  const [lgShow, setLgShow] = useState(false);
  const [input, setInput] = useState([]);

  async function updateEmployee(id){
    let toBeUpdated = {};
    if(typeof(input.Name) != "undefined")toBeUpdated["Name"] = input.Name;
    if(typeof(input.Adress) != "undefined")toBeUpdated["Adress"] = input.Adress;
    if(typeof(input.Email) != "undefined")toBeUpdated["Email"] = input.Email;
    if(typeof(input.Hire_date) != "undefined")toBeUpdated["Hire_date"] = input.Hire_date;
    if(typeof(input.Salary) != "undefined")toBeUpdated["Salary"] = input.Salary;
    if(typeof(input.Job_title) != "undefined")toBeUpdated["Job_title"] = input.Job_title;
    if(typeof(input.Project_id) != "undefined")toBeUpdated["Project_id"] = input.Project_id;

    try{
    const response = await fetch(`/employees/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(toBeUpdated)
  });
  }
  catch(ex){
    setTimeout(() => {  console.error('exxxxxxxxxxxxxxxxx: ', ex); }, 20004);
  }
  }

  return (
    <>
      <Button variant="contained" onClick={() => setLgShow(true)} startIcon={<EditIcon />} > Edit </Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Update Element with ID {element}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Employee Name</Form.Label>
            <Form.Control type="text" placeholder="Name" defaultValue={entry.Name} onInput={e => {input.Name = e.target.value;console.log(input)}}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Hire Date</Form.Label>
            <Form.Control type="text" placeholder="Hire Date" defaultValue={entry.Hire_date} onInput={e => {input.Hire_date = e.target.value;}}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Salary</Form.Label>
            <Form.Control type="text" placeholder="Salary" defaultValue={entry.Salary} onInput={e => {input.Salary = e.target.value;}}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Job Title</Form.Label>
            <Form.Control type="text" placeholder="Job Title" defaultValue={entry.Job_title} onInput={e => {input.Job_title = e.target.value;}}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
            <Form.Control type="text" placeholder="Email" defaultValue={entry.Email} onInput={e => {input.Email = e.target.value;}}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Address" defaultValue={entry.Adress} onInput={e => {input.Adress = e.target.value;}}/>
          </Form.Group>
          <Buttonn variant="primary" type="submit" onClick={() => {updateEmployee(entry._id)}}>
            Submit
          </Buttonn>
        </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}