import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Form, Button as Buttonn} from 'react-bootstrap'

import Button from '@mui/material/Button';

export const AddEmployeeModal = () => {
  const [lgShow, setLgShow] = useState(false);
  //const [input, setInput] = useState([]);
  var input = {};

  async function addEmployee(){
    let toBeUpdated = {};
    if(typeof(input.Name) != "undefined")toBeUpdated["Name"] = input.Name;else return;
    if(typeof(input.Adress) != "undefined")toBeUpdated["Adress"] = input.Adress;else return;
    if(typeof(input.Email) != "undefined")toBeUpdated["Email"] = input.Email;else return;
    if(typeof(input.Hire_date) != "undefined")toBeUpdated["Hire_date"] = input.Hire_date;else return;
    if(typeof(input.Salary) != "undefined")toBeUpdated["Salary"] = input.Salary;else return;
    if(typeof(input.Job_title) != "undefined")toBeUpdated["Job_title"] = input.Job_title;else return;
    if(typeof(input.Project_id) != "undefined")toBeUpdated["Project_id"] = input.Project_id;else return;

    try{
    const response = await fetch(`/employees`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(toBeUpdated)
  });
  }
  catch(ex){
    setTimeout(() => {  console.error('ex: ', ex); }, 20004);
  }
  }

  return (
    <>
    <Button variant="contained" color="success" onClick={() => setLgShow(true)}>Add an Employee</Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Add an Employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Employee Name</Form.Label>
            <Form.Control type="text" placeholder="Name" onInput={e => {input.Name = e.target.value;}}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Hire Date</Form.Label>
            <Form.Control type="text" placeholder="Hire Date (MM.DD.YYYY)" onInput={e => {input.Hire_date = e.target.value;}}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Salary</Form.Label>
            <Form.Control type="text" placeholder="Salary" onInput={e => {input.Salary = e.target.value;}}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Job Title</Form.Label>
            <Form.Control type="text" placeholder="Job Title" onInput={e => {input.Job_title = e.target.value;}}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
            <Form.Control type="text" placeholder="Email" onInput={e => {input.Email = e.target.value;}}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Address" onInput={e => {input.Adress = e.target.value;}}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Project ID</Form.Label>
            <Form.Control type="text" placeholder="Project ID" onInput={e => {input.Project_id = e.target.value;}}/>
          </Form.Group>
          <Buttonn variant="primary" type="submit" onClick={() => {addEmployee()}}>
            Submit
          </Buttonn>
        </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}