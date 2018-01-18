import React from 'react';
import ReactDOM from 'react-dom';
import SecondPage from './FirstPage.jsx';
import MeetupListEntry from './MeetupListEntry.jsx';
import Index from './Index.jsx';
import { Link } from 'react-router-dom';
const SeeMoreCard = (props) => (
  <div className="seeMore">
  <p>{props.meetup.name}</p>
  <p>Date:{props.meetup.local_date}</p>
  <p>Description:{props.description}</p>
  <p>Time: {props.meetup.local_time.split(':')[0] > 12 ? props.meetup.local_time.split(':')[0] - 12+ 'PM' : props.meetup.local_time + 'AM'}</p>
  <p>RSVP count: {props.meetup.yes_rsvp_count}</p>
  <p>Group name: {props.group.name}</p>
  <p>Group Location: {props.group.localized_location}</p>
  <p style={{textDecoration: 'underline'}}>Save to my account</p>
  <div>
   <img src={props.photo.photo_link} alt="" style={{'margin': '0 auto', 'width':'150px', 'height': '100px'}} />
   </div>
  <div><a href={props.meetup.link + ' '}target="_blank" style={{textDecoration: 'underline'}}>View on meetup.com</a></div>

  </div>
)

export default SeeMoreCard;
