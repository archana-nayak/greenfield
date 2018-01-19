import React from 'react';
  const SavedListEntry = function(props) {
    function strip(html) {
       var tmp = document.createElement("DIV");
       tmp.innerHTML = html;
       return tmp.textContent;
    }
    var desc = strip(props.myEvents.description).slice(0,150) + '...';
    return <div className="mappedEvents"><a href={props.myEvents.link} target="_blank"><li>{props.myEvents.name}</li></a>
    <div className="eventDescription">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{desc}</div><hr></hr></div>
  }
 export default SavedListEntry;
