import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';

import { Redirect } from "react-router-dom";

export const Logout = () => {
    localStorage.setItem("token", '');
    localStorage.setItem('tokenAvailable', false);
    localStorage.clear();
    return (<Redirect to="/login"/>);
}