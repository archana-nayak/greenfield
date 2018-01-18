import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/Index.jsx';
import SignUpFormSimple from '../components/SignUpFormSimple.jsx';
import SignUpFormExtended from '../components/SignUpFormExtended.jsx';
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
     <div>
     <h1 style={{display: 'flex'}}>
     <img src='https://n6-img-fp.akamaized.net/free-icon/telegram-logo_318-102687.jpg?size=338c&ext=jpg' width="30" height="50"/>
     <text style={{display: 'flex', flex: 1, textAlign: 'center', alignSelf: 'center', flexDirection: 'row', justifyContent: 'center'}}>our app</text>
     <Link className="btn" to={{pathname:'/'}}>Home</Link>
     <Link className="btn" to={{pathname:'/Login'}}>Login</Link>
     <Link className="btn" to={{pathname:'/Signup'}}>Signup</Link>
     </h1>
     <button className="btn" style={{margin: 'auto'}}onClick={this.handleClick}> {this.state.displayText ? 'Add more information' : 'Simple signup'}</button>
     <Link className="btn" to={{pathname:'/Login'}}>I have an account!</Link>
     {this.state.showExtended ? <SignUpFormExtended/>  : <SignUpFormSimple/>}
     </div>
   );
 }
}
export default SignUpForm;
