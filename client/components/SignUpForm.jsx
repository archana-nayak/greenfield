import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/Index.jsx';
import SignUpFormSimple from '../components/SignUpFormSimple.jsx';
import SignUpFormExtended from '../components/SignUpFormExtended.jsx';
import FlatButton from 'material-ui/flatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
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
     <h1 style={{display: 'flex'}}>
     <text style={{display: 'flex', flex: 1, textAlign: 'center', alignSelf: 'center', flexDirection: 'row', justifyContent: 'center'}}>What's going on tonight?</text>
     <Link className="btn" to={{pathname:'/'}}>Home</Link>
     <Link className="btn" to={{pathname:'/Login'}}>Login</Link>
     <Link className="btn" to={{pathname:'/Signup'}}>Signup</Link>
     </h1>
     <FlatButton style={{textDecoration: 'underline'}} onClick={this.handleClick}> {this.state.displayText ? 'Add more information' : 'Simple signup'}</FlatButton>
     <FlatButton style={{textDecoration: 'underline'}}><Link to={{pathname:'/Login'}}>I have an account!</Link></FlatButton>
     {this.state.showExtended ? <SignUpFormExtended/>  : <SignUpFormSimple/>}
     </div>
     </MuiThemeProvider>
   );
 }
}
export default SignUpForm;
