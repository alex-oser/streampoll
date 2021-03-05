import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { Button } from '@material-ui/core';

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

    window.open("/api/login", 'popUpWindow', 'height=500,width=400,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
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
      </div>
    </Router>
  );
}

export default App; 