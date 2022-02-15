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


import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap'


import {useEffect, useState} from 'react'

export const Pr = () => {
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
    async function deleteStudent(id) {
        const response = await fetch(`/projects/${id}`, {
          method: "DELETE",
        });
        setInitialState(delElement(id));
        return response.json();
      }

    useEffect(()=>{
        fetch('/projects/').then(res => {
            if(res.ok){
                return res.json()
            }
        }).then(jsonResponse => setInitialState(jsonResponse))
    }, [])

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
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
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
              <StyledTableCell >ID</StyledTableCell>
                <StyledTableCell >Project Name</StyledTableCell>
                <StyledTableCell align="left">Start Date</StyledTableCell>
                <StyledTableCell align="left">End Date</StyledTableCell>
                <StyledTableCell align="left">Project Code</StyledTableCell>
                <StyledTableCell align="left">Description</StyledTableCell>
                <StyledTableCell align="left"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {initialState.map((row) => (
                <StyledTableRow key={row.ID}>
                  <StyledTableCell component="th" scope="row">
                    {i += 1}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.Project_name}</StyledTableCell>
                  <StyledTableCell align="left">{row.Start_date.slice(0, 10)}</StyledTableCell>
                  <StyledTableCell align="left">{row.Planned_end_date.slice(0, 10)}</StyledTableCell>
                  <StyledTableCell align="left">{row.Project_code}</StyledTableCell>
                  <StyledTableCell align="left">{row.Description}</StyledTableCell>
                  <StyledTableCell align="left"><Button variant="outlined" startIcon={<EditIcon />}> Edit </Button> <Button variant="contained" key={i} endIcon={<DeleteIcon />} onClick={() => deleteStudent(initialState[i-1]["_id"])}> Delete </Button></StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        


        </div>
      )
}
