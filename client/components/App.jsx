// import React, { Component } from "react";
import axios from "axios";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    }
  }

  componentDidMount() {
    axios.get("https://maps.googleapis.com/maps/api/js?key=AIzaSyBB4o26wQD95JOSxa9IrabEo1q6vGh3e2c&callback=initMap";)
    .then(function(res) {
      this.setState({
        items: res.data.items
      });
    })
    .catch(function(ele) {
      console.log("err ", ele);
    })
  }

  render() {
    var renderItems = this.state.items.map(function(item, i) {
      return (
        <li key={i}>{item.title}</li>
      )
    });
    return (
      <ul className="App">
        {renderItems}
      </ul>
    );
  }
}