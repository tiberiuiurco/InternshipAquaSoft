import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap'
import Axios from "axios";


import {useEffect, useState} from 'react'
import { Redirect, useHistory } from "react-router-dom";

import { useStateIfMounted } from 'use-state-if-mounted'


export const Login = () => {
  let history = useHistory();
    let input = {};
    const [loginStatus, setLoginStatus] = useStateIfMounted(0);

    const [success, setSuccess] = useStateIfMounted(0);

    var toBeUpdated = {};
    
    const addUser = () => {
      if(typeof(input.email) != "undefined")toBeUpdated["email"] = input.email;else{setSuccess(3);return;}
      if(typeof(input.password) != "undefined")toBeUpdated["password"] = input.password;else{setSuccess(3);return;}
  
      Axios.post("http://localhost:3000/api/auth/signin", toBeUpdated).then((response) => {

          if(!response.data.auth){
            console.log("Autentificare Esuata!");
            setLoginStatus(0);
            setSuccess(2);
          }
          else{
            console.log("Autentificare Reusita!");
            setLoginStatus(1);
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('tokenAvailable', true)
            localStorage.setItem('name', response.data.name)
            console.log('TOKEN: ' + localStorage.getItem('tokenAvailable'));
            setSuccess(1);
          }
      }).catch((error) => {setSuccess(2);})
    }

    function loginError(id){
      switch(id){
        case 2:
          return (<Stack sx={{ width: '100%' }} spacing={2} alignItems='center'><Alert severity="error" inputProps={{min: 0, style: { textAlign: 'center' }}}>Incorrect Email or Password. Try again!</Alert></Stack>);
          break;
        case 3:
          return (<Stack sx={{ width: '100%' }} spacing={2} alignItems='center'><Alert severity="warning" inputProps={{min: 0, style: { textAlign: 'center' }}}>Please input both fields!</Alert></Stack>);
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
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onInput={e => {input.password = e.target.value;console.log(input);}}
        />
        </div>
        {success==2?<div>{loginError(2)}</div>:(success==3?<div>{loginError(3)}</div>:'')}
    <div class="testt"><Button variant="dark mt-2" onClick={() => {addUser()}}>Login</Button>{' '}</div>
    {success===1?<Redirect to="/"/>:''}
    </Box>
    </div>
      </>)
}
