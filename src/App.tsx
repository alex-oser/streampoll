import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login'
import Home from './Home'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="Login">
        <Login />
      </div>
    </Router>
  );
}

export default App; 