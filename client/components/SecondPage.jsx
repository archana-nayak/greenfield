import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import MeetUpList from './MeetUpList.jsx';
import Login from './Login.jsx';
import Profile from './Profile.jsx';
import Search from './Search.jsx';
import ProfileCard from './ProfileCard.jsx';
import SeeMoreCard from './SeeMoreCard.jsx';
import LoginForm from './LoginForm.jsx';
import SignUpForm from './SignUpForm.jsx';
import moment from 'moment';
import MapContainer from '../components/MapContainer.jsx';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
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
        displaySeeMore: false,
        date: '',
        currentEvents: [],
        showProfile: false,
        date: '',
        categories: [],
      }
      this.saveEvent = this.saveEvent.bind(this);
      this.closeButton = this.closeButton.bind(this);
      this.onProfileClick = this.onProfileClick.bind(this);
      this.fetchProfileInfo = this.fetchProfileInfo.bind(this);
      this.getZipcode = this.getZipcode.bind(this);
      this.strip = this.strip.bind(this);
      this.getMeetups = this.getMeetups.bind(this);
      this.weKnowTheLocation = this.weKnowTheLocation.bind(this);
      this.errorHandler = this.errorHandler.bind(this);
      this.id = 0;
      this.seeMore = this.seeMore.bind(this);
      this.getMeetupsByCategory = this.getMeetupsByCategory.bind(this);
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
            displaySeeMore: true,
            date: moment(event.local_date, "YYYY-MM-DD").format("MM-DD-YYYY").split('-').join('/')
          })
        }
      });
    }
    weKnowTheLocation (pos) {
        var crd = pos.coords;
        var thisLat = crd.latitude;
        var thisLon = crd.longitude;
        this.setState({lat: thisLat});
        this.setState({lon: thisLon});
        navigator.geolocation.clearWatch(this.id);
        this.getMeetups();
    };
    saveEvent() {
      window.currentEvents.push(this.state.meetup);
    }
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
    closeButton() {
      this.setState({
        displaySeeMore: !this.state.displaySeeMore
      })
    }
    componentDidMount() {
      var options = {
        enableHighAccuracy: false,
        timeout: 8000,
        maximumAge: 0
      };
      this.fetchProfileInfo();
      this.id = navigator.geolocation.getCurrentPosition(this.weKnowTheLocation, this.errorHandler, options);
    }

    getZipcode(event) {
      this.setState({zipcode : event.target.value});
    }
    onProfileClick() {
      this.setState({displayCard: !this.state.displayCard});
    }
    getMeetups() {
     $.ajax({
       url: '/meetups',
       type: 'GET',
       contentType: 'application/json',
       data: {zipcode : this.state.zipcode, lat: this.state.lat, lon: this.state.lon},
       success: (data) => {
         console.log('successsssssss!', data.meetups);
        this.setState({meetups : JSON.parse(data.meetups)});
       },
       error: (err) => {
         console.log('an error is happen');
       }
     }).done((data) => {
       console.log('done');
       var meetups = data.meetups;
       meetups = JSON.parse(meetups);
       var categories = data.categories;
       this.setState({
         location: meetups.city,
         events: meetups.events,
         categories: categories
       })
      });
     }
    getMeetupsByCategory(searchOptions){
    searchOptions.lat = this.state.lat;
    searchOptions.lon = this.state.lon;
    $.ajax({
      url: '/meetups/categories',
      type: "GET",
      contentType: 'application/json',
      data: searchOptions,
      success: (data) => {
      },
      error: (err) => {
        console.log(err);
      }
    })
    .done((data) => {
      var meetups = data.meetups;
      console.log(JSON.parse(meetups));
      meetups = JSON.parse(meetups).results;
      this.setState({events: meetups});
    });
    ;
  }
  render() {
    return (
      <MuiThemeProvider>
      <div>
      <div>
      <h1 style={{display: 'flex'}}>
      <text style={{display: 'flex', flex: 1, textAlign: 'center', alignSelf: 'center', flexDirection: 'row', justifyContent: 'center'}}>What is going on tonight?</text>
      <Link to={{pathname:'/home'}}>Home</Link>
      <Link className="btn" to={{pathname:'/create'}}>Create event</Link>
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
      <div className ="cardTest">
      {this.state.displaySeeMore ? <SeeMoreCard saveEvent={this.saveEvent} closeButton={this.closeButton}meetup={this.state.meetup} group={this.state.group} photo={this.state.photo} date={this.state.date} description={this.state.description}/> : null}
      </div>
      </div>
      <div className="list">
      <MeetUpList events={this.state.events} seeMore={this.seeMore}/>
      <Search categories={this.state.categories} handleSearch={this.getMeetupsByCategory}/>
      </div>
      </div>
      </MuiThemeProvider>
    );
  };
}
window.currentEvents = [];
export default SecondPage;
