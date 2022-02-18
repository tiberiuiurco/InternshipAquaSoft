import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Form, Button as Buttonn} from 'react-bootstrap'

import Button from '@mui/material/Button';

export const AddProjectModal = () => {
  const [lgShow, setLgShow] = useState(false);
  //const [input, setInput] = useState([]);
  var input = {};

  async function addProject(){
    let toBeUpdated = {};
    if(typeof(input.Project_name) != "undefined")toBeUpdated["Project_name"] = input.Project_name;else return;
    if(typeof(input.Start_date) != "undefined")toBeUpdated["Start_date"] = input.Start_date;else return;
    if(typeof(input.Planned_end_date) != "undefined")toBeUpdated["Planned_end_date"] = input.Planned_end_date;else return;
    if(typeof(input.Description) != "undefined")toBeUpdated["Description"] = input.Description;else return;
    if(typeof(input.Project_code) != "undefined")toBeUpdated["Project_code"] = input.Project_code;else return;

    try{
    const response = await fetch(`/projects`, {
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
    <Button variant="contained" color="success" onClick={() => setLgShow(true)}>Add a Project</Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Add a Project
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}