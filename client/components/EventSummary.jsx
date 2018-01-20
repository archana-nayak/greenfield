import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import $ from 'jquery';
class EventSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: '',
      eventLocation: '',
      eventDescription: '',
      eventTopic: '',
      eventTime: '',
    }
    this.fetchPostedEvent = this.fetchPostedEvent.bind(this);
  }
  componentDidMount() {
    console.log('component mounted')
    this.fetchPostedEvent();
  }
  fetchPostedEvent() {
    console.log('fetch posted event function is firing!');
    $.ajax({
      method: 'GET',
      url: '/events',
      dataType: 'json',
      success: (modelData) => {
        console.log('fetchPostedEvent fired successfully', modelData);
        this.setState({
          eventName: modelData.eventName,
          eventLocation: modelData.eventLocation,
          eventTopic: modelData.eventTopic,
          eventDescription: modelData.eventDescription,
          eventTime: modelData.eventTime
        });
      },
      error: (error) => {
        console.log('Failed to GET events', error);
      }
    });
  }
  render() {
    return (
      <div>
      <h1 style={{display: 'flex'}}>
        <text style={{display: 'flex', flex: 1, textAlign: 'center', alignSelf: 'center', flexDirection: 'row', justifyContent: 'center'}}>What is going on tonight?</text>
        <Link className="btn" to={{pathname:'/home'}}>Home</Link>
        <Link className="btn" to={{pathname:'/logout'}}>Logout</Link>
        <Link className="btn" to={{pathname:'/profile'}}>My Profile</Link>
      </h1>
      <div>
        <p>Event name: {this.state.eventName}</p>
        <p>Event location {this.state.eventLocation}</p>
        <p>Event description {this.state.eventDescription}</p>
        <p>Event time {this.state.eventTime}</p>
        <p>Event date {this.state.eventDate}</p>
      </div>
    </div>
    )
  }
}
export default EventSummary;
