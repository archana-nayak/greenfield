import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import MeetUpList from '../components/MeetUpList.jsx';
import MapContainer from '../components/MapContainer.jsx';
import Login from '../components/Login.jsx';
import LoginForm from '../components/LoginForm.jsx';
import SignUpForm from '../components/SignUpForm.jsx';
import {BrowserRouter, Router, Route, browserHistory, Switch, IndexRoute} from 'react-router-dom';
const path = require('path');
class FirstPage extends React.Component {
  constructor(props) {
    super(props);

      this.state = {
        items: [],
        zipcode: '',
        events: [],
        location: '',
        lat: '',
        lon: '',
        zipcodeAsker: '',
        zipcodebutton: ''
      }
      this.getZipcode = this.getZipcode.bind(this);
      this.getMeetups = this.getMeetups.bind(this);
      this.weKnowTheLocation = this.weKnowTheLocation.bind(this);
      this.errorHandler = this.errorHandler.bind(this);
      this.displayList = this.displayList.bind(this);
      this.id = 0;
    }

    displayList () {
      console.log('we are trying to display the list');

    };
    weKnowTheLocation (pos) {
        var crd = pos.coords;
        // console.log('Your current position is:');
        // console.log(`Latitude : ${crd.latitude}`);
        // console.log(`Longitude: ${crd.longitude}`);
        // console.log(`More or less ${crd.accuracy} meters.`);
        var thisLat = crd.latitude;
        var thisLon = crd.longitude;
        this.setState({lat: thisLat});
        this.setState({lon: thisLon});
        navigator.geolocation.clearWatch(this.id);
        this.getMeetups();
    };

    errorHandler () {
        this.setState({zipcodeAsker: (<input id="ourZip" placeholder="zipcode" value={this.state.zipcodes} onChange={this.getZipcode}></input>)});
        this.setState({zipcodebutton: (<button id="meetupRequest" onClick={this.getMeetups}>Find MeetUps</button>)});
      };
    componentDidMount() {
      var options = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0
      };
      this.id = navigator.geolocation.getCurrentPosition(this.weKnowTheLocation, this.errorHandler, options);
    }

    getZipcode(event) {
      // console.log('we got the zipcode');
      this.setState({zipcode : event.target.value});
    }

    getMeetups() {
      console.log('we are trying to get the meetups');
      $.ajax({
        url: '/meetups',
        type: 'GET',
        contentType: 'application/json',
        data: {zipcode : this.state.zipcode, lat: this.state.lat, lon: this.state.lon},
        success: (meetups) => {
          console.log('success!');
         this.setState({meetups : meetups});
        },
        error: (err) => {
          console.log('an error is happen');
          console.log(err);
        }
      }).done((meetups) => {
        // console.log('done');
          meetups = JSON.parse(meetups);
          this.setState({location: meetups.city});
          this.setState({events: meetups.events});
          console.log(meetups.events);});
          this.displayList();
        //now we should call the function to plot the meetups on the map
        //and also populate the list with meetup descriptions
        //console.log(JSON.parse(meetups));});
    }


  render() {
    return (
      <div>
      <Login/>
      <div className="askForZipCode">{this.state.zipcodeAsker}</div>
      <div>{this.state.zipcodebutton}</div>
      <div className="map">
      <div>
        <MapContainer meetups={this.state.events}
        initialLocation={{lat: this.state.lat, lng: this.state.lon}} 
        />
      </div>
      </div>
      <div className="list">
      <MeetUpList events={this.state.events} />
      </div>
      </div>
    );
  };
}
export default FirstPage;

 