import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap'

import Axios from "axios";

import {useEffect, useState} from 'react'

export const Register = () => {
    let input = {};
    const [ok, setOk] = useState(0);

    async function addUser(){
      let toBeUpdated = {};
      if(typeof(input.name) != "undefined")toBeUpdated["name"] = input.name;else return;
      if(typeof(input.email) != "undefined")toBeUpdated["email"] = input.email;else return;
      if(typeof(input.password) != "undefined")toBeUpdated["password"] = input.password;else return;
      if(typeof(input.age) != "undefined")toBeUpdated["age"] = input.age;else return;
  
      Axios.post("http://localhost:3000/api/auth/signup", toBeUpdated).then((response) => {
        setOk(1);
      }).catch((error) => {setOk(2);console.log(error);});
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
      <div class="testt">
      <TextField
          required
          id="outlined-required"
          label="Name"
          placeholder='Name'
          onInput={e => {input.name = e.target.value;console.log(input);}}
        />
        <TextField
          required
          id="outlined-required"
          label="Email"
          placeholder='Email'
          onInput={e => {input.email = e.target.value;console.log(input);}}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onInput={e => {input.password = e.target.value;console.log(input);}}
        />
        <TextField
          id="outlined-number"
          label="Age"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onInput={e => {input.age = parseInt(e.target.value);console.log(input);}}
        />
      </div>
    <div class="testt"><Button variant="dark" onClick={() => {addUser()}}>Register</Button>{' '}</div>
      {ok}
    </Box>
      </>)
}
