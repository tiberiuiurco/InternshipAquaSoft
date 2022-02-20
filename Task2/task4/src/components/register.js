import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap'

import Axios from "axios";

import {useEffect, useState} from 'react'

import { useStateIfMounted } from 'use-state-if-mounted'

export const Register = () => {
    let input = {};
    const [ok, setOk] = useStateIfMounted(0);

    async function addUser(){
      let toBeUpdated = {};
      if(typeof(input.name) != "undefined")toBeUpdated["name"] = input.name;else{setOk(3);return;}
      if(typeof(input.email) != "undefined")toBeUpdated["email"] = input.email;else{setOk(3);return;}
      if(typeof(input.password) != "undefined")toBeUpdated["password"] = input.password;else{setOk(3);return;}
      if(typeof(input.age) != "undefined")toBeUpdated["age"] = input.age;else{setOk(3);return;}
  
      Axios.post("http://localhost:3000/api/auth/signup", toBeUpdated).then((response) => {
        setOk(1);
      }).catch((error) => {setOk(2);console.log(error);});
    }

    function registerError(id){
      switch(id){
        case 2:
          return (<Stack sx={{ width: '100%' }} spacing={2} alignItems='center'><Alert severity="error" inputProps={{min: 0, style: { textAlign: 'center' }}}>Incorrect submit format. Try again!</Alert></Stack>);
          break;
        case 3:
          return (<Stack sx={{ width: '100%' }} spacing={2} alignItems='center'><Alert severity="warning" inputProps={{min: 0, style: { textAlign: 'center' }}}>Please input all requried fields!</Alert></Stack>);
          break;
      }
      
    }

    return(<>
        <div class="testt">
         <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch', color: "#f0f0f0" }, display: 'flex', justifyContent: 'center', flexDirection: 'column'
      }}
      noValidate
      height={500}
      autoComplete="off"
      justifyContent="center"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="Email"
          placeholder='Email'
          onInput={e => {input.email = e.target.value;console.log(input);}}
        />
        </div>
      <div>
      <TextField
          required
          id="outlined-required"
          label="Name"
          placeholder='Name'
          onInput={e => {input.name = e.target.value;console.log(input);}}
        />
        </div>
        <div>
        <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onInput={e => {input.password = e.target.value;console.log(input);}}
        />
        </div>
        <div>
        <TextField
          required
          id="outlined-number"
          label="Age"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onInput={e => {input.age = parseInt(e.target.value);console.log(input);}}
        />
        </div>
    {ok==2?<div>{registerError(2)}</div>:(ok==3?<div>{registerError(3)}</div>:'')}
    <div class="testt"><Button variant="dark mt-2" onClick={() => {addUser()}}>Register</Button>{' '}</div>
    </Box>
    </div>
      </>)
}
