import React from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import MeetupMap from './MeetupMap.jsx';

class MapContainer extends React.Component {
  render() {
    return (
      <div className="MapContainer">
        <MeetupMap
          google={this.props.google}
          initialCenter = {this.props.initialLocation}
          zoom = {13}
          meetups={this.props.meetups}
          {...this.props}/>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyChZPizXo_3sk70Cm4yveOd0YfQtuxc7As',
  libraries:['places']
})(MapContainer)
