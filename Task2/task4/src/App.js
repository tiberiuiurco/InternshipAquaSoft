import React from "react";
import "./App.css";
import Axios from "axios";
import { Projects } from './components/projects'
import { Navb } from './components/Navigation'
import { Employees } from './components/employees'
import { Pr } from './components/pr'
import { AddProject } from './components/addProject'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  Axios({
    method: "GET",
    url: "http://localhost:5000/",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    console.log(res.data.message);
  });

  return (
    
    <Router>
      <div className="App">
        <Navb/>
        <div className="content">
          <Switch>
            <Route path="/employees">
              <Employees/>
            </Route>
            <Route path="/projects">
              <Pr/>
            </Route>
            <Route path="/">
            <AddProject/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;