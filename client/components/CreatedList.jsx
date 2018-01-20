import React from 'react';
import CreatedListEntry from './CreatedListEntry.jsx';
import CreateEvent from './CreateEvent.jsx';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/flatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
const CreatedList = function(props)  {
  return (
    <div>
    <div>My created events</div>
    <ul>
      {props.createdEvents.length > 0 ? props.createdEvents.map((event, key) => <CreatedListEntry event={event} key={key}/>) : null}
    </ul>
    <div>
    <FlatButton style={{textDecoration: 'underline'}}><Link to={{pathname:'/create'}}>Add an event</Link></FlatButton>
    </div>
    </div>
  );
}

export default CreatedList;
