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
        });  
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
