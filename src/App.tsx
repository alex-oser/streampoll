import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { Button } from '@material-ui/core';

const {
  REACT_APP_BUILD_INFO = "[local] ...",
} = process.env;

function App() {
  // const [data, setData] = useState({});

  // useEffect(() => {
  //   fetch('/api')
  //   .then(res => res.json())
  //   .then(res => setData(res))

  // }, []);

  const handleLogin = () => {
    // fetch('/api/login')
    // .then(res => res.json())
    // .then(res => setData(res));
    window.location.href = "/api/login";
  }

  return (
    <Router>
      <div className="Login">
          
          <Button 
            variant="contained"
            size="large"
            color="primary"
            onClick={handleLogin}
          > 
            Login 
          </Button>

          <h1>{REACT_APP_BUILD_INFO}</h1>
      </div>
    </Router>
  );
}

export default App; 