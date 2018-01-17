import React from 'react';
import ReactDOM from 'react-dom';
import FirstPage from './FirstPage.jsx';
import SecondPage from './SecondPage.jsx';
import Index from './Index.jsx';
import $ from 'jquery';
import { Link } from 'react-router-dom';
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {}
    }
  }
  componentDidMount() {
      console.log('im in fetching a profile?')
      $.ajax({
      url: '/users',
      method: 'GET',
      success: (data) => {
        this.setState({
          profile: data
        });
        console.log('hello', this.state.profile);
      },
      error: (error) => {
        console.log('fail safe', error)
      }
    });
    }
  render() {
    return (
  <div>
  <h1 style={{display: 'flex'}}>
  <img src='https://n6-img-fp.akamaized.net/free-icon/telegram-logo_318-102687.jpg?size=338c&ext=jpg' width="30" height="50"/>
  <text style={{display: 'flex', flex: 1, textAlign: 'center', alignSelf: 'center', flexDirection: 'row', justifyContent: 'center'}}>our app</text>
  <Link className="btn" to={{pathname:'/home'}}>home</Link>
  <Link className="btn" to={{pathname:'/logout'}}>logout</Link>
  <Link className="btn" to={{pathname:'/profile'}}>My Profile</Link>
  </h1>
  <div className="profile">
  <img src="http://www.telegraph.co.uk/content/dam/men/2016/05/24/Untitled-1_trans_NvBQzQNjv4BqqVzuuqpFlyLIwiB6NTmJwfSVWeZ_vEN7c6bHu2jJnT8.jpg?imwidth=450" alt="John" style={{'margin': '0 auto', 'width':'150px', 'height': '100px'}}/>
  <p className="title">{this.state.profile.username}</p>
  <p>{this.state.profile.location}</p>
  <p>{this.state.profile.age}</p>
  <p>{this.state.profile.biography}</p>
  </div>
  </div>
)
}
}

export default Profile;
