import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
const EventForm = (props) => {
  return (
    <div>
        <h1 style={{display: 'flex'}}>
          <text style={{display: 'flex', flex: 1, textAlign: 'center', alignSelf: 'center', flexDirection: 'row', justifyContent: 'center'}}>What is going on tonight?</text>
          <Link className="btn" to={{pathname:'/Home'}}>Home</Link>
          <Link className="btn" to={{pathname:'/Logout'}}>Logout</Link>
          <Link className="btn" to={{pathname:'/Profile'}}>My Profile</Link>
        </h1>
        <div className="eventCreation">
          <h2 style={{textAlign: 'center'}}>Create an Event</h2>
          <br />
          <form action='/events' method='post'>
              <input className="eventName" placeholder="Enter event name" name="eventName" type="text" />
              <input className="eventLocation" placeholder="Enter event location" name="eventLocation" type="text" />
              <input className="eventTopic" placeholder="Enter event topic" name="eventTopic" type="text" />
              <input className="eventDate" placeholder="Enter event date" name="eventTime" type="text" />
              <input className="eventTime" placeholder="Enter event time" name="eventDate" type="text" />
              <input className="eventDescription" placeholder="Enter in a description of the event" name="eventDescription" type="text" />
            <br />
            <button>Create Event</button>
          </form>
        </div>
      </div>
  )
}
export default EventForm;
