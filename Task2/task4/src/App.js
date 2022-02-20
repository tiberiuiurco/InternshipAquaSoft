import React, {useState} from "react";
import "./App.css";
import { Projects } from './components/projects'
import { NavbIn } from './components/NavigationIn'
import { Employees } from './components/employees'
import { Register } from './components/register'
import { Login } from './components/login'
import { Logout } from './components/logout'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { useStateIfMounted } from 'use-state-if-mounted'


function App() {
  const [user, setUser] = useState(false);
  const userLogged = localStorage.getItem('tokenAvailable');
  setInterval(()=>
    {
      //console.log(typeof user);
      const userLogged = localStorage.getItem('tokenAvailable');
      if (userLogged==='true'){
        setUser(true);
      }
      else{
        setUser(false);
      }
    }, 10
    )

    

  return (
    
    <Router>
      <div className="App">
        <div className="content">
        <NavbIn userLogged={user}/>
          <Switch>
            <Route path="/employees">
            {user?<Employees/>:''}
            </Route>
            <Route path="/projects">
            {user?<Projects/>:''}
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