import React from "react";
import "./App.css";
import Axios from "axios";
import { Projects } from './components/projects'
import { NavbIn } from './components/NavigationIn'
import { NavbOut } from './components/NavigationOut'
import { Employees } from './components/employees'
import { UpdateProjectModal } from './components/updateProjectModal'
import { Register } from './components/register'
import { Login } from './components/login'
import { Logout } from './components/logout'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  Axios({
    method: "GET",
    url: "http://localhost:5000/",
    headers: {
      "Content-Type": "application/json"
    }
  })

  let tokenAvailable = localStorage.getItem('tokenAvailable');
  let tokenAv = false;
    tokenAv = tokenAvailable==='true'?true:false;
  console.log(tokenAvailable);

  return (
    
    <Router>
      <div className="App">
        <div className="content">
        {tokenAv?<NavbIn/>:''}
        {!tokenAv?<NavbOut/>:''}
          <Switch>
            <Route path="/employees">
            {tokenAvailable==='true'?<Employees/>:'Amin'}
              
            </Route>
            <Route path="/projects">
            {tokenAvailable==='true'?<Projects/>:'Amin'}
            </Route>
            <Route path="/register">
              <Register/>
              <style>{`body, .testt{background-color: #f0f0f0 !important;}`}</style>
            </Route>
            <Route path="/login">
              <Login/>
              <style>{`body, .testt{background-color: #f0f0f0 !important;}, .centreText{text-align: center !important;}`}</style>
            </Route>
            <Route path="/logout">
              <Logout/>
            </Route>
            <Route path="/">
            </Route>

          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;