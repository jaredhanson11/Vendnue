import React from 'react';
import ReactDOM from 'react-dom';

import SignupPage from '../react_components/signup_page.jsx';

// login page params
var names = ['Vendnue', 'Find Events','Sell Tickets','My Tickets', 'Login','Sign Up'];
var links = ['#','#','#','#','/login','/signup'];
var dropdownNames = ['Sign in','My Hub','Gift Codes','Settings'];

ReactDOM.render(
    <div>
    <SignupPage names={names} links={links} dropdownNames={dropdownNames} /> 
    </div>,
    document.getElementById('main')
);