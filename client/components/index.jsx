import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LoginForm from './loginform.jsx';
import FirstPage from './firstpage.jsx';
import SignUpForm from './signupform.jsx';
import Login from './login.jsx';
import Profile from './profile.jsx';
ReactDOM.render(
      <Router>
      <Switch>
      <Route exact path="/" component={FirstPage}/>
      <Route exact path="/signup" component={SignUpForm}/>
      <Route exact path="/login" component={LoginForm}/>
      <Route exact path="/profile" component={Profile}/>
      </Switch>
      </Router>,document.getElementById('app')
);
