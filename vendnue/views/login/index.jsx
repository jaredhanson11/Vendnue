import React from 'react';
import ReactDOM from 'react-dom';

import LoginPage from '../react_components/login_page.jsx';

// login page params
var names = ['Vendnue', 'Find Events','Sell Tickets','My Tickets', 'Login','Sign Up'];
var links = ['#','#','#','#','/login','/signup'];
var dropdownNames = ['Sign in','My Hub','Gift Codes','Settings'];

ReactDOM.render(
    <div>
    <LoginPage names={names} links={links} dropdownNames={dropdownNames} />
    </div>,
    document.getElementById('main')
);
