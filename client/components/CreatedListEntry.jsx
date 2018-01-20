import React from 'react';
  const CreatedListEntry = function(props) {
    return <div className="mappedEvents"><h8>{props.event.event_name}</h8>
    <div className="eventDescription">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.event.event_description}</div><div>Date:{props.event.event_date}</div><div>Time:{props.event.event_time}</div><hr></hr></div>
  }
 export default CreatedListEntry;
