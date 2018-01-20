import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import EventForm from './EventForm.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/flatbutton';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
class CreateEvent extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <MuiThemeProvider>
      <div>
        <EventForm />
      </div>
      </MuiThemeProvider>
    )
  }
}

export default CreateEvent;
