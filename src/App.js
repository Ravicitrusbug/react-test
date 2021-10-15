import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';

function App() {
  return (
    <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/students"} className="navbar-brand">
            Registration
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/students"} className="nav-link">
                Students
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/students"]} component={StudentList} />
            <Route exact path="/add" component={StudentForm} />
          </Switch>
        </div>
      </Router>
  );
}

export default App;
