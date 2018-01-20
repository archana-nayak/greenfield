import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import MeetUpList from './MeetUpList.jsx';
import MapContainer from '../components/MapContainer.jsx';
import Login from './Login.jsx';
import Profile from './Profile.jsx';
import ProfileCard from './ProfileCard.jsx';
import LoginForm from './LoginForm.jsx';
import SignUpForm from './SignUpForm.jsx';
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
        zipcodebutton: '',
        profile: ''
      }
      this.fetchSession = this.fetchSession.bind(this);
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
    fetchSession() {
      console.log('im in fetching?')
      $.ajax({
      url: '/session',
      method: 'GET',
      success: (data) => {
        if (typeof data.redirect == 'string'){
            window.location = data.redirect
          }
        this.setState({
          profile: data
        });
      },
      error: (error) => {
        console.log('fail safe', error)
      }
    });
    }
    componentDidMount() {
      var options = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0
      };
      this.fetchSession();
      this.id = navigator.geolocation.getCurrentPosition(this.weKnowTheLocation, this.errorHandler, options);
    }

    getZipcode(event) {
      console.log('we got the zipcode');
      this.setState({zipcode : event.target.value});
    }

    getMeetups() {
      $.ajax({
        url: '/meetups',
        type: 'GET',
        contentType: 'application/json',
        data: {zipcode : this.state.zipcode, lat: this.state.lat, lon: this.state.lon},
        success: (meetups) => {
         this.setState({meetups : meetups});
        },
        error: (err) => {
          console.log('an error is happening', err);
        }
      }).done((meetups) => {
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
      <div id="mainDiv">
      <Login/>
      <div className="askForZipCode">{this.state.zipcodeAsker}</div>
      <div>{this.state.zipcodebutton}</div>
      <div className="map">
        <MapContainer meetups={this.state.events}
        initialLocation={{lat: this.state.lat, lng: this.state.lon}}
        />
      </div>
      <div className="list">
      <MeetUpList events={this.state.events} />
      <ProfileCard profile={this.state.profile}/>
      </div>
      </div>
    );
  };
}
export default FirstPage;
