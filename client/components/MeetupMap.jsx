import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class MeetupMap extends React.Component {

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google || prevProps.meetups !== this.props.meetups) {
      this.loadMap();
    }
  }

  loadMap() {
    if (this.props && this.props.google) {
      const {google} = this.props;
      const maps = google.maps;
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);
      let {zoom} = this.props;
      const {lat, lng} = this.props.initialCenter;
      // console.log('lat ', lat);
      // console.log('lng ', lng);
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      this.map = new maps.Map(node, mapConfig);

      this.props.meetups.map((meetup, index) => {

        const marker = new google.maps.Marker({
          position: {lat: meetup.group.lat, lng: meetup.group.lon},
          map: this.map,
          title: meetup.name,
        });

        const infowindow = new google.maps.InfoWindow({
          content: `<h6>${meetup.name}</h6>`
        });
        marker.addListener('click', () => {
          infowindow.open(this.map, marker);
          setTimeout(() => { infowindow.close(); }, 5000);
        });
      });
    }
  }

  render() {
    const style = {
      width: '65vw',
      height: '65vh'
    }
    return (
      <div ref='map' style={style}>
        Loading map...
      </div>
    );
  }
}

export default MeetupMap;