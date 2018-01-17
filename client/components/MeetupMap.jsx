import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class MeetupMap extends React.Component {

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google || prevProps.meetups !== this.props.meetups) {
      this.loadMap();
    }
  }

  // console.log(this.props.meetups);

  loadMap() {
    if (this.props && this.props.google) {
      const {google} = this.props;
      const maps = google.maps;
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);
      let {zoom} = this.props;
      const {lat, lng} = this.props.initialCenter;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      this.map = new maps.Map(node, mapConfig);

      for (var i = 0; i < this.props.meetups.length; i++) {
        console.log(this.props.meetups[i].name);
      }

      var holder = [];
      console.log('HEEEEEEEEEEY');
      for (var i = 0; i < this.props.meetups.length; i++) {
        console.log(this.props.meetups[i]);
        if (this.props.meetups[i].venue) {
          console.log(`There is a venue! It is at ${this.props.meetups[i].venue.lat} and ${this.props.meetups[i].venue.lon}`)
          holder.push(this.props.meetups[i]);
        }
      }
      console.log(holder);
      holder.map((meetup, index) => {
        // console.log(`the meetup's name is ${meetup.name}`);
        // console.log(`the meetups venue is ${meetup.venue}`);
        // console.log(`lat: ${meetup.venue.lat} lon: ${meetup.venue.lon}`);
        console.log('NOW PLOTTIN THIS MEETUP');
        console.dir(meetup);
        const marker = new google.maps.Marker({
          position: {lat: meetup.group.lat, lng: meetup.group.lon},
          map: this.map,
          title: meetup.name,
        });
        });  

        function strip(html) {
           var tmp = document.createElement("DIV");
           tmp.innerHTML = html;
           return tmp.textContent;
        }
        var desc = strip(meetup.description).slice(0,150) + '...';

        const infowindow = new google.maps.InfoWindow({
          content: `<a href=${meetup.link} target="_blank"><h6>${meetup.name}</h6>${desc}</a>`
        });
        marker.addListener('click', () => {
          infowindow.open(this.map, marker);
        });
    }
  }

  render() {
    var style = {
      width: '65vw',
      height: '90vh'
    }
    return (
      <div ref='map' style={style}>
        Loading map...
      </div>
    );
  }
}

export default MeetupMap;
