import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import MeetUpList from './MeetUpList.jsx';
import Login from './Login.jsx';
import Profile from './Profile.jsx';
import ProfileCard from './ProfileCard.jsx';
import SeeMoreCard from './SeeMoreCard.jsx';
import LoginForm from './LoginForm.jsx';
import SignUpForm from './SignUpForm.jsx';
import MapContainer from '../components/MapContainer.jsx';
import { Link } from 'react-router-dom';
import {BrowserRouter, Router, Route, browserHistory, Switch, IndexRoute} from 'react-router-dom';
const path = require('path');
class SecondPage extends React.Component {
  constructor(props) {
    super(props);

      this.state = {
        meetups: [],
        items: [],
        zipcode: '',
        events: [],
        location: '',
        lat: '',
        lon: '',
        zipcodeAsker: '',
        zipcodebutton: '',
        profile: '',
        meetup: {},
        group: {},
        photo: {},
        description: '',
        displayCard: false,
        displaySeeMore: false
      }
      this.onProfileClick = this.onProfileClick.bind(this);
      this.fetchProfileInfo = this.fetchProfileInfo.bind(this);
      this.getZipcode = this.getZipcode.bind(this);
      this.strip = this.strip.bind(this);
      this.getMeetups = this.getMeetups.bind(this);
      this.weKnowTheLocation = this.weKnowTheLocation.bind(this);
      this.errorHandler = this.errorHandler.bind(this);
      this.displayList = this.displayList.bind(this);
      this.id = 0;
      this.seeMore = this.seeMore.bind(this);
    }
    strip(html) {
         var tmp = document.createElement("DIV");
         tmp.innerHTML = html;
         return tmp.textContent;
    }
    seeMore(marker) {
      this.state.events.map((event) => {
        if(event.name === marker){
          this.setState({
            meetup: event,
            description: this.strip(event.description),
            group: event.group,
            photo: event.group.photo ? event.group.photo : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS5QBzAjXODH-QDaa6tVLGT10ZHa8aiJzgKL_n4F-a_H9lnuA-fQ',
            displaySeeMore: true
          })
        }
      });
      }
    displayList () {
      console.log('we are trying to display the list');

    };
    weKnowTheLocation (pos) {
        var crd = pos.coords;
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
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
    fetchProfileInfo() {
      $.ajax({
      url: '/users',
      method: 'GET',
      success: (data) => {
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
      this.fetchProfileInfo();
      this.id = navigator.geolocation.getCurrentPosition(this.weKnowTheLocation, this.errorHandler, options);
    }

    getZipcode(event) {
      console.log('we got the zipcode');
      this.setState({zipcode : event.target.value});
    }
    onProfileClick() {
      this.setState({displayCard: !this.state.displayCard});
    }
    getMeetups() {
      console.log('we are trying to get the meetups');
      $.ajax({
        url: '/meetups',
        type: 'GET',
        contentType: 'application/json',
        data: {zipcode : this.state.zipcode, lat: this.state.lat, lon: this.state.lon},
        success: (meetups) => {
          console.log('successsssssss!');
         this.setState({meetups : meetups});
        },
        error: (err) => {
          console.log('an error is happen');
          console.log(err);
        }
      }).done((meetups) => {
        console.log('done');
          meetups = JSON.parse(meetups);
          this.setState({location: meetups.city});
          this.setState({events: meetups.events});
          console.log(this.state.photo);});
          this.displayList();
        //now we should call the function to plot the meetups on the map
        //and also populate the list with meetup descriptions
        //console.log(JSON.parse(meetups));});
    }
  render() {
    return (
      <div>
      <div>
      <h1 style={{display: 'flex'}}>
      <text style={{display: 'flex', flex: 1, textAlign: 'center', alignSelf: 'center', flexDirection: 'row', justifyContent: 'center'}}>What's going on tonight?</text>
      <Link className="btn" to={{pathname:'/home'}}>Home</Link>
      <Link className="btn" to={{pathname:'/logout'}}>Logout</Link>
      <div className="btn" to={{pathname:'/profile'}} onClick={this.onProfileClick}>{this.state.profile.username}'s profile</div>
      </h1>
      </div>
            {this.state.displayCard ? <ProfileCard profile={this.state.profile}/> : null}
      <div className="askForZipCode">{this.state.zipcodeAsker}</div>
      <div>{this.state.zipcodebutton}</div>
      <div className="map">
      <div>
       <MapContainer meetups={this.state.events} seeMore={this.seeMore}
       initialLocation={{lat: this.state.lat, lng: this.state.lon}}
       />
      </div>
      <div style={{display: 'flex'}}>
      {this.state.displaySeeMore ? <SeeMoreCard style={{display: 'flex', flex: 1, alignSelf: 'center', flexDirection: 'row', justifyContent: 'center'}}meetup={this.state.meetup} group={this.state.group} photo={this.state.photo} description={this.state.description}/> : null}
      </div>
      </div>
      <div className="list">
      <MeetUpList events={this.state.events} seeMore={this.seeMore}/>
      </div>
      </div>
    );
  };
}
export default SecondPage;
