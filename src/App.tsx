import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './Login'
import {
  BrowserRouter as Router,
} from "react-router-dom";

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch('/api')
    .then(res => res.json())
    .then(res => setData(res))

  }, []);


  return (
    <Router>      
      <div className="Login">
        <pre>{JSON.stringify(data)}</pre>
        <Login />
      </div>
    </Router>
  );
}

export default App; 