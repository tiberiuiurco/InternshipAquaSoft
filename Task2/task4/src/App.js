import React from "react";
import "./App.css";
import Axios from "axios";
import { Projects } from './components/projects'
import { Navb } from './components/Navigation'
import { Employees } from './components/employees'
import { UpdateProjectModal } from './components/updateProjectModal'

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
              <Projects/>
            </Route>
            <Route path="/">
              <Employees/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;