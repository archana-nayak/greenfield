import React from 'react';
import MeetupListEntry from './MeetupListEntry.jsx';
import FirstPage from './FirstPage.jsx';
const MeetUpList = function(props)  {
  console.log('the meetup list is ');
  var sortedEvents = props.events.sort(function(a,b) {return a.created - b.created});
  var holder = [];
  for (var i = 0; i < sortedEvents.length; i++){
    if (sortedEvents[i].venue !== undefined) {
      holder.push(sortedEvents[i])
    }
  }
  sortedEvents = holder;
  return(
    <ul>
      {sortedEvents.length ? sortedEvents.map((event) => <MeetupListEntry event={event} key={event.id}/>) : null}
    </ul>
  );

}

export default MeetUpList;
