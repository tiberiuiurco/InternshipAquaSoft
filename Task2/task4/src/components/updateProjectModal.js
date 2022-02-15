import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Form, Button as Buttonn} from 'react-bootstrap'

import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';

export const UpdateProjectModal = ({element, entry}) => {
  const [lgShow, setLgShow] = useState(false);
  const [input] = useState([]);

  async function updateProject(id){
    let toBeUpdated = {};
    if(typeof(input.Project_name) != "undefined")toBeUpdated["Project_name"] = input.Project_name;
    if(typeof(input.Start_date) != "undefined")toBeUpdated["Start_date"] = input.Start_date;
    if(typeof(input.Planned_end_date) != "undefined")toBeUpdated["Planned_end_date"] = input.Planned_end_date;
    if(typeof(input.Description) != "undefined")toBeUpdated["Description"] = input.Description;
    if(typeof(input.Project_code) != "undefined")toBeUpdated["Project_code"] = input.Project_code;

    try{
    const response = await fetch(`/projects/${id}`, {
      method: 'PATCH',
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
          <Form.Label>Project Name</Form.Label>
            <Form.Control type="text" placeholder="Project Name" defaultValue={entry.Project_name} onInput={e => {input.Project_name = e.target.value;console.log(input)}}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Start Date</Form.Label>
            <Form.Control type="text" placeholder="Start Date" defaultValue={entry.Start_date.slice(0, 10)} onInput={e => {input.Start_date = e.target.value;console.log(input)}}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>End Date</Form.Label>
            <Form.Control type="text" placeholder="End Date" defaultValue={entry.Planned_end_date.slice(0, 10)} onInput={e => {input.Planned_end_date = e.target.value;console.log(input)}}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Project Code</Form.Label>
            <Form.Control type="text" placeholder="Project Code" defaultValue={entry.Project_code} onInput={e => {input.Project_code = e.target.value;console.log(input)}}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Description</Form.Label>
            <Form.Control type="text" placeholder="Description" defaultValue={entry.Description} onInput={e => {input.Description = e.target.value;console.log(entry)}}/>
          </Form.Group>
          <Buttonn variant="primary" type="submit" onClick={() => {console.log(entry._id);updateProject(entry._id)}}>
            Submit
          </Buttonn>
        </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}