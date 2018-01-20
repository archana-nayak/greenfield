import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login.jsx';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/flatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.onChange = this.onChange.bind(this);

  }
  onChange(e){
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
  }
  render() {
    const { username, password} = this.state;
    return (
      <MuiThemeProvider>
      <div>
      <h1 style={{display: 'flex'}}>
      <text style={{display: 'flex', flex: 1, textAlign: 'center', alignSelf: 'center', flexDirection: 'row', justifyContent: 'center'}}>What's going on tonight?</text>
      <Link className="btn" to={{pathname:'/'}}>Home</Link>
      <Link className="btn" to={{pathname:'/login'}}>Login</Link>
      <Link className="btn" to={{pathname:'/signup'}}>Signup</Link>
      </h1>
      <FlatButton style={{textDecoration: 'underline'}}><Link to={{pathname:'/signup'}}>No account? Sign up here</Link></FlatButton>
      <FlatButton style={{textDecoration: 'underline'}}><Link to={{pathname:'/home'}}>I don't wanna</Link></FlatButton>
      <form action='/auth' method='post'>
        <label htmlFor="username"></label>
        <input placeholder="Enter your username" type="text" name="username" value={username} onChange={this.onChange} />
        <label htmlFor="password"></label>
        <input placeholder="Enter your password" type="password" name="password" value={password} onChange={this.onChange} />
        <button>Login!</button>
      </form>
      </div>
      </MuiThemeProvider>
    );
  }
}
export default LoginForm;
