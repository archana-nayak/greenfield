import React from 'react';
import MeetupListEntry from './MeetupListEntry.jsx';
import FirstPage from './FirstPage.jsx';
const MeetUpList = function(props)  {

  return(
    <ul>
      {props.events.length ? props.events.map((event) => <MeetupListEntry event={event} key={event.id}/>) : null}
    </ul>
  );

}

export default MeetUpList;
