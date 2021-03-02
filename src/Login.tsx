import React, { useReducer, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      flexGrow: 1
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff'
    },
    card: {
      marginTop: theme.spacing(10)
    }
  })
);

//state type

type State = {
  username: string
  password:  string
  email: string
  isButtonDisabled: boolean
  helperText: string
  isError: boolean
};

const initialState:State = {
  username: '',
  password: '',
  email: '',
  isButtonDisabled: true,
  helperText: '',
  isError: false
};

type Action = { type: 'setUsername', payload: string }
  | { type: 'setPassword', payload: string }
  | { type: 'setEmail', payload: string }
  | { type: 'setIsButtonDisabled', payload: boolean }
  | { type: 'loginSuccess', payload: string }
  | { type: 'loginFailed', payload: string }
  | { type: 'setIsError', payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setUsername': 
      return {
        ...state,
        username: action.payload
      };
    case 'setPassword': 
      return {
        ...state,
        password: action.payload
      };
    case 'setIsButtonDisabled': 
      return {
        ...state,
        isButtonDisabled: action.payload
      };
    case 'loginSuccess': 
      return {
        ...state,
        helperText: action.payload,
        isError: false
      };
    case 'loginFailed': 
      return {
        ...state,
        helperText: action.payload,
        isError: true
      };
    case 'setIsError': 
      return {
        ...state,
        isError: action.payload
      };
    case 'setEmail': 
      return {
        ...state,
        email: action.payload
      };
  }
}

const Login = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [login, setLogin] = useState(true);

  useEffect(() => {
    if (state.username.trim() && state.password.trim()) {
     dispatch({
       type: 'setIsButtonDisabled',
       payload: false
     });
    } else {
      dispatch({
        type: 'setIsButtonDisabled',
        payload: true
      });
    }
  }, [state.username, state.password]);

  const handleLogin = () => {
    if (state.username === 'user' && state.password === 'pass') {
      dispatch({
        type: 'loginSuccess',
        payload: 'Login Successfully'
      });
    } else {
      dispatch({
        type: 'loginFailed',
        payload: 'Incorrect username or password'
      });
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      state.isButtonDisabled || handleLogin();
    }
  };

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setUsername',
        payload: event.target.value
      });
    };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setPassword',
        payload: event.target.value
      });
    }

  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> =
  (event) => {
    dispatch({
      type: 'setEmail',
      payload: event.target.value
    });
  }

  const handleBack = () => {
    setLogin(! login)
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      { login ? 
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="streampoll" />
        <CardContent>
          <div>
            <TextField error={state.isError} fullWidth id="username" type="email" label="Username" margin="normal" onChange={handleUsernameChange} onKeyPress={handleKeyPress} />
            <TextField error={state.isError} fullWidth id="password" type="password" label="Password" margin="normal" helperText={state.helperText} onChange={handlePasswordChange} onKeyPress={handleKeyPress} />
          </div>
        </CardContent>
        <CardActions>
          <Button variant="contained" size="large" color="secondary" className={classes.loginBtn} onClick={handleLogin} disabled={state.isButtonDisabled}> Login </Button>
        </CardActions>
        <Button size="large" color="secondary" className={classes.loginBtn} onClick={handleBack}> Register </Button>
        <Button size="large" color="secondary" className={classes.loginBtn} onClick={handleLogin}> Forgot Password </Button>
      </Card>
      :
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="streampoll" />
        <CardContent>
          <div>
            <TextField error={state.isError} fullWidth id="username" type="email" label="Username" margin="normal" onChange={handleUsernameChange} onKeyPress={handleKeyPress} />
            <TextField error={state.isError} fullWidth id="password" type="password" label="Password"  margin="normal" helperText={state.helperText} onChange={handlePasswordChange} onKeyPress={handleKeyPress} />
            <TextField error={state.isError} fullWidth id="passwordConfirm" type="passwordConfirm" label="Confirm Password" margin="normal" helperText={state.helperText} onChange={handlePasswordChange} onKeyPress={handleKeyPress} />
            <TextField error={state.isError} fullWidth id="email" type="email" label="Email" margin="normal" helperText={state.helperText} onChange={handleEmailChange} onKeyPress={handleKeyPress} />
          </div>
        </CardContent>
        <CardActions>
          <Button variant="contained" size="large" color="secondary" className={classes.loginBtn} onClick={handleLogin} disabled={state.isButtonDisabled}> Register </Button>
        </CardActions>
        <Button size="large" color="secondary" className={classes.loginBtn} onClick={handleBack}> Go back </Button>
      </Card>
    }
    </form>
  );
}

export default Login;