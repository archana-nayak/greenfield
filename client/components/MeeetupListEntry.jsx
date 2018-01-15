import React from 'react';
 const MeetupListEntry = (props) => {
   return <a href={props.event.link}><li>{props.event.name}</li><hr></hr></a>
 }
 //<img src={props.event.group.photo.thumb_link}
 export default MeetupListEntry; 
