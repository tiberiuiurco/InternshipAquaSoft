import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';

import { UpdateEmployeeModal } from './updateEmployeeModal'
import { AddEmployeeModal } from './addEmployeeModal'
import { AddEmployeeProjectView } from './addEmployeeProjectView'


import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap'


import {useEffect, useState} from 'react'

export const Employees = () => {
    let i = 0;
    const [initialState, setInitialState] = useState([])
    // Modal
    const [lgShow, setLgShow] = useState(false);

    // Delete
    function delElement(id){
        var tempArray = []
        for(let j = 0; j < initialState.length; j++){
            if(j != i-1){
                tempArray.push(initialState[j]);
            }
        }
        return tempArray;
    }
    async function deleteEmployee(id) {
        const response = await fetch(`/employees/${id}`, {
          method: "DELETE",
        });
        setInitialState(delElement(id));
        return response.json();
      }
    async function updateStudent(id){
      const response = await fetch(`/employees/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'bla' })
    });
    }

    useEffect(()=>{
        fetch('/employees/').then(res => {
            if(res.ok){
                return res.json()
            }
        }).then(jsonResponse => setInitialState(jsonResponse))
    }, [])
    //theme.palette.action.hover
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
          color: "#ffffff"
        }
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: '#17263e',
        },
        '&:nth-of-type(even)': {
            backgroundColor: '#34568b',
            color: "#fb0000"
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
      
      function createData(Project_name, Start_date, Planned_end_date, Description, Project_code) {
        return { Project_name, Start_date, Planned_end_date, Description, Project_code };
      }
      
    console.log(initialState);
    //return(<div>
     //   {initialState.length > 0 && initialState.map((elem, i) => <li key={i}>{elem.Project_name}</li>)}
    //</div>)
    return (
        <div className="aa">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700, maxWidth: 2000 }} aria-label="customized table">
            <TableHead>
              <TableRow>
              <StyledTableCell >ID</StyledTableCell>
                <StyledTableCell >Name</StyledTableCell>
                <StyledTableCell align="left">Hire_date</StyledTableCell>
                <StyledTableCell align="left">Salary</StyledTableCell>
                <StyledTableCell align="left">Job Title</StyledTableCell>
                <StyledTableCell align="left">Email</StyledTableCell>
                <StyledTableCell align="left">Address</StyledTableCell>
                <StyledTableCell align="left"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {initialState.map((row) => (
                <StyledTableRow key={i}>
                  <StyledTableCell component="th" scope="row">
                    {i += 1}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.Name}</StyledTableCell>
                  <StyledTableCell align="left">{row.Hire_date.slice(0, 10)}</StyledTableCell>
                  <StyledTableCell align="left">{row.Salary}</StyledTableCell>
                  <StyledTableCell align="left">{row.Job_title}</StyledTableCell>
                  <StyledTableCell align="left">{row.Email}</StyledTableCell>
                  <StyledTableCell align="left">{row.Adress}</StyledTableCell>
                  <StyledTableCell align="right"><UpdateEmployeeModal element={i} entry={initialState[i-1]}/><Button variant="contained" key={i} endIcon={<DeleteIcon />} onClick={() => deleteEmployee(initialState[i-1]["_id"])}> Delete </Button></StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <AddEmployeeModal/>
        <AddEmployeeProjectView/>

        </div>
      )
}
