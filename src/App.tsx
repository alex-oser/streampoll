import React from 'react';
import './App.css';
import Login from './Login'
import {
  BrowserRouter as Router,
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