import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch, PrivateRoute} from 'react-router-dom';
import LoginForm from './LoginForm.jsx';
import FirstPage from './FirstPage.jsx';
import SignUpForm from './SignUpForm.jsx';
import Login from './Login.jsx';
import Profile from './Profile.jsx';
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
