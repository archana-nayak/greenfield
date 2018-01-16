import React from 'react';
import ReactDOM from 'react-dom';
import FirstPage from './FirstPage.jsx';
import Index from './Index.jsx';
import { Link } from 'react-router-dom';
const ProfileCard = (props) => (
  <div className="card">
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3sjvg567TeRTpVrueOai-GO3tLwyZ3HRZM8oNoBsBcbmsm-0Y2Q" style={{'margin': '0 auto', 'width':'150px', 'height': '100px'}}/>
  <p className="title">{props.profile.username}</p>
  <p>{props.profile.age}</p>
  <p>{props.profile.biography}</p>
  <p>{props.profile.location}</p>
  <Link to={{pathname:'/profile'}}>My Profile</Link>
  </div>
)

export default ProfileCard;
