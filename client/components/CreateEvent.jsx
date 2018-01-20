import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import EventForm from './EventForm.jsx';
<<<<<<< HEAD
=======
import EventSummary from './EventSummary.jsx';
>>>>>>> createdEvents now show on user profile
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
