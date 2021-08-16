import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import ProfileButton from './ProfileButton';

import './Navigation.css';

function Navigation({ isLoaded }){
  const dispatch = useDispatch()
  function loginDemo () {
    return dispatch(sessionActions.login({ credential:"demo@user.io", password:"password" }))
  };
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton className="profile-btn" user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <div className="user-acc-links">
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="" onClick={loginDemo}>Demo</NavLink>
      </div>
    );
  }

  return (
    <ul id="navbar">
      <li className="nav-link">
        <NavLink className="nav-home" exact to="/home">Home</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
