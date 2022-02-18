import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap'
import Axios from "axios";

import {useEffect, useState} from 'react'
import { Redirect } from "react-router-dom";


export const Login = () => {
    let input = {};
    const [loginStatus, setLoginStatus] = useState(0);

    const [success, setSuccess] = useState(0);
    /*
    async function addUser(){
      let toBeUpdated = {};
      if(typeof(input.email) != "undefined")toBeUpdated["email"] = input.email;else return;
      if(typeof(input.password) != "undefined")toBeUpdated["password"] = input.password;else return;
  
      try{
      const response = await fetch(`/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toBeUpdated)
    }).then((response) => {console.log("1");});
    }
    catch(ex){
      setTimeout(() => {  console.error('ex: ', ex); }, 20004);
    }
    }*/
    const addUser = () => {
      let toBeUpdated = {};
      if(typeof(input.email) != "undefined")toBeUpdated["email"] = input.email;else return;
      if(typeof(input.password) != "undefined")toBeUpdated["password"] = input.password;else return;
  
      Axios.post("http://localhost:3000/api/auth/signin", toBeUpdated).then((response) => {
        console.log(response.data.age);
          if(!response.data.auth){
            setLoginStatus(0);
            setSuccess(2);
            console.log('Nu am gasit');
          }
          else{
            setLoginStatus(1);
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('tokenAvailable', true)
            localStorage.setItem('tokenAvailable', true)
            localStorage.setItem('name', response.data.name)
            console.log(localStorage.getItem('tokenAvailable'));
            setSuccess(1);
          }
      }).catch((error) => {setSuccess(2);})
    }

    function loginError(){
      return (<Stack sx={{ width: '100%' }} spacing={2}><Alert severity="error" inputProps={{min: 0, style: { textAlign: 'center' }}}>This is an error alert — check it out!</Alert></Stack>);
    }

    return(<>
         <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch', color: "#f0f0f0" },
      }}
      noValidate
      autoComplete="off"
    >
      <div class="center-block">
      {success==2?loginError():''}
      </div>
      <div class="testt">
        <div>
        <TextField
          required
          id="outlined-required"
          label="Email"
          placeholder='Email'
          onInput={e => {input.email = e.target.value;console.log(input);}}
        />
        </div>
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onInput={e => {input.password = e.target.value;console.log(input);}}
        />
      </div>
    <div class="testt"><Button variant="dark" onClick={() => {addUser()}}>Login</Button>{' '}</div>
      {loginStatus?<Redirect to="/"/>:''}
    </Box>
      </>)
}
