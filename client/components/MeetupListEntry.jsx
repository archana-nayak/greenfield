import React from 'react';
  const MeetupListEntry = function(props) {
    function strip(html) {
       var tmp = document.createElement("DIV");
       tmp.innerHTML = html;
       return tmp.textContent;
    }
    var desc = strip(props.event.description).slice(0,150) + '...';
    return <a href={props.event.link} target="_blank"><li>{props.event.name}<div className="eventDescription">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{desc}</div></li><hr></hr></a>
  }
 export default MeetupListEntry; 
