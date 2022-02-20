import React, { Component, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Form, Button as Buttonn, Offcanvas} from 'react-bootstrap'

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import axios from 'axios'

import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';

import { useStateIfMounted } from 'use-state-if-mounted'

export function AddEmployeeProjectView() {
    const [show, setShow] = useStateIfMounted(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let i = 0;
    const [initialState, setInitialState] = useStateIfMounted([])
  
    useEffect(()=>{
      axios.get('http://localhost:3000/projects', {headers: {'x-access-token': localStorage.getItem('token')}}).then(res => {
        setInitialState(res.data);
        console.log(res);
      }).catch((error) => {console.log("FALSE");localStorage.setItem('tokenAvailable', false)})
    }, []);

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

    return (
      <>
        <Buttonn variant="primary" onClick={handleShow}>
          Check Project IDs
        </Buttonn>
  
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>List of Projects</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 350 }} aria-label="customized table">
                <TableHead>
                <TableRow>
                <StyledTableCell >Project Name</StyledTableCell>
                    <StyledTableCell >ID</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {initialState.map((row) => (
                    <StyledTableRow key={row.ID}>
                    <StyledTableCell component="th" scope="row">
                        {row.Project_name}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row._id}</StyledTableCell>
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }
  