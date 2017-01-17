import React from 'react';
import ReactDOM from 'react-dom';

import NavigatorContainer from '../react_components/navbar_container.jsx'
import SignupForm from '../react_components/signup_form.jsx'

// login page params
var names = ['Vendnue', 'Find Events','Sell Tickets','My Tickets', 'Login','Sign Up'];
var links = ['#','#','#','#','/login','/signup'];
var dropdownNames = ['Sign in','My Hub','Gift Codes','Settings'];
const searchPlaceholder = 'Search for genres, artists, teams, or venues';

ReactDOM.render(
    <div>
    <NavigatorContainer />
    <SignupForm searchPlaceholder={searchPlaceholder} names={names} links={links} dropdownNames={dropdownNames} /> 
    </div>,
    document.getElementById('main')
);