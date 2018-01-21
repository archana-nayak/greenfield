import React from 'react';
import ReactDOM from 'react-dom';
import FirstPage from './FirstPage.jsx';
import SecondPage from './SecondPage.jsx';
import Index from './Index.jsx';
import { Link } from 'react-router-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import FlatButton from 'material-ui/flatbutton';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <MuiThemeProvider>
      <div>
      <AppBar title={<span style={{backgroundColor: '#f47023'}}>MINGLR</span>}showMenuIconButton={false} style={{backgroundColor: '#f47023'}}>
      <FlatButton primary={true}><Link to={{pathname:'/home'}}>Home</Link></FlatButton>
      <FlatButton ><Link to={{pathname:'/create'}}>Create event</Link></FlatButton>
      <FlatButton ><Link to={{pathname:'/logout'}}>Logout</Link></FlatButton>
      <FlatButton ><Link to={{pathname:'/profile'}}>Profile</Link></FlatButton>
      </AppBar>
      </div>
      </MuiThemeProvider>
    );
  }
}
export default Login;
