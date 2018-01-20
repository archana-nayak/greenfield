import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import EventForm from './EventForm.jsx';
class CreateEvent extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <div>
        <EventForm />
      </div>
    )
  }
}

export default CreateEvent;
