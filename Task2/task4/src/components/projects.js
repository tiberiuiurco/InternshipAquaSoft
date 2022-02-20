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

import { UpdateProjectModal } from './updateProjectModal'
import { AddProjectModal } from './addProjectModal'

//import { checkToken } from '../verifyToken'


import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap'

import { useStateIfMounted } from 'use-state-if-mounted'

import {useEffect} from 'react'

import axios from 'axios'

export const Projects = () => {
  
    let i = 0;
    const [initialState, setInitialState] = useStateIfMounted([])
    // Modal
    const [lgShow, setLgShow] = useStateIfMounted(false);

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
    async function updateStudent(id){
      const response = await fetch(`/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'bla' })
    });
    }

    function modifyProjData(id, data){
      for(let j = 0; j < initialState.length; j++){
        if(j === id-1){
            Object.entries(data).forEach(([key, value]) => {initialState[j][key] = value; console.log("Key: "+key+" | Value: "+value);})
        }
      }
      setInitialState(JSON.parse(JSON.stringify(initialState)));
    }

    function modifyProjAddedData(data){
      console.log("DATA: "+JSON.stringify(initialState));
      initialState.push(data);
      setInitialState(JSON.parse(JSON.stringify(initialState)));
    }

    useEffect(()=>{
      axios.get('http://localhost:3000/projects', {headers: {'x-access-token': localStorage.getItem('token')}}).then(res => {
        setInitialState(res.data);
        console.log(res);
      }).catch((error) => {console.log("FALSE");localStorage.clear();})
    }, []);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
          color: "#ffffff"
        },
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
                <StyledTableRow key={i}>
                  <StyledTableCell component="th" scope="row">
                    {i += 1}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.Project_name}</StyledTableCell>
                  <StyledTableCell align="left">{row.Start_date.slice(0, 10)}</StyledTableCell>
                  <StyledTableCell align="left">{row.Planned_end_date.slice(0, 10)}</StyledTableCell>
                  <StyledTableCell align="left">{row.Project_code}</StyledTableCell>
                  <StyledTableCell align="left">{row.Description}</StyledTableCell>
                  <StyledTableCell align="right"><UpdateProjectModal element={i} entry={initialState[i-1]} modifyProjData={modifyProjData}/><Button variant="contained" key={i} endIcon={<DeleteIcon />} onClick={() => deleteStudent(initialState[i-1]["_id"])}> Delete </Button></StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <AddProjectModal modifyProjAddedData={modifyProjAddedData}/>


        </div>
      )
}
