import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './Login'
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { Button } from '@material-ui/core';

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch('/api')
    .then(res => res.json())
    .then(res => setData(res))

  }, []);

  const handleLogin = () => {
    // fetch('/api/login')
    // .then(res => res.json())
    // .then(res => setData(res));

    window.open("http://127.0.0.1:5001/streampoll-dev-b2f18/us-central1/api/login", 'popUpWindow', 'height=500,width=400,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
  }

  return (
    <Router>
      <div className="Login">

          <Button 
            variant="contained"
            size="large"
            color="secondary"
            onClick={handleLogin}
          > 
            Login 
          </Button>
      </div>
    </Router>
  );
}

export default App; 