import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/Index.jsx';
import SignUpFormSimple from '../components/SignUpFormSimple.jsx';
import SignUpFormExtended from '../components/SignUpFormExtended.jsx';
import FlatButton from 'material-ui/flatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import $ from 'jquery';
import { Link } from 'react-router-dom';
class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showExtended: false,
      showSimple: true,
      displayText: true,
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({
      showSimple: !this.state.showSimple,
      showExtended: !this.state.showExtended,
      displayText: !this.state.displayText
    })
  }
  render() {
   return (
     <MuiThemeProvider>
     <div>
     <AppBar title={<span style={{backgroundColor: '#f47023'}}><img src='../minglr.gif'/></span>}showMenuIconButton={false} style={{backgroundColor: '#f47023'}}>
     </AppBar>
     <FlatButton fullWidth={true} style={{textDecoration: 'underline'}}><Link to={{pathname:'/Login'}}>I have an account!</Link></FlatButton>
     <FlatButton fullWidth={true} style={{textDecoration: 'underline'}} onClick={this.handleClick}> {this.state.displayText ? 'Add more information' : 'Simple signup'}</FlatButton>
     {this.state.showExtended ? <SignUpFormExtended/>  : <SignUpFormSimple/>}
     </div>
     </MuiThemeProvider>
   );
 }
}
export default SignUpForm;
