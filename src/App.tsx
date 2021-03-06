
import { useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
} from "react-router-dom";


const callbackUrl = window.location.protocol + '//' + window.location.host + '/api/oauth/callback';

const {
  REACT_APP_BUILD_INFO = "[local] ...",
} = process.env;

function App() {
  const [userData, setUserData] = useState(null);
  const loginUrl = `https://id.twitch.tv/oauth2/authorize?client_id=8gabwtp7cisw11d1vsjkw90u0y2bw7&redirect_uri=${encodeURIComponent(callbackUrl)}&response_type=code&state=bNTHcbQBRW0qkdZ3Qyu51A%3D%3D`;

  useEffect(() => {
    fetch('/api/me')
    .then(res => res.json())
    .then(res => setUserData(res));
  }, []);


  return (
    <Router>
      <div className="Login">
          <pre>{loginUrl}</pre>
          <pre>{JSON.stringify(userData)}</pre>

          { userData
            ? 
            <a href="/api/logout">LOG OUT</a>
            :
            <a href={loginUrl}>LOGIN</a>
          }
          

          <h1>{REACT_APP_BUILD_INFO}</h1>
      </div>
    </Router>
  );
}

export default App; 