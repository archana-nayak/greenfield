// import React, { Component } from "react";
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import MeetUpList from '../components/meetuplist.jsx';
import Map from '../components/map.jsx';
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    }
  }

  // componentDidMount() {
  //   axios.get("https://maps.googleapis.com/maps/api/js?key=AIzaSyBB4o26wQD95JOSxa9IrabEo1q6vGh3e2c&callback=initMap";)
  //   .then(function(res) {
  //     this.setState({
  //       items: res.data.items
  //     });
  //   })
  //   .catch(function(ele) {
  //     console.log("err ", ele);
  //   })
  // }

  render() {
    return (
      <div>
      <h1>LOGO</h1>
      <h2> OUR APP</h2>
      <div className="map">
      <h3>Map Goes Here</h3>
      <Map/>
      </div>
      <div className="list">
      <MeetUpList />
      </div>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('app'));
