import React from 'react';
import ReactDOM from 'react-dom';

import NavbarContainer from '../react_components/navbar_container.jsx'
import LoginForm from '../react_components/login_form.jsx'

// login page params
var names = ['Vendnue', 'Find Events','Sell Tickets','My Tickets', 'Login','Sign Up'];
var links = ['#','#','#','#','/login','/signup'];
var dropdownNames = ['Sign in','My Hub','Gift Codes','Settings'];
const searchPlaceholder = 'Search for genres, artists, teams, or venues';

// main, header, footer 
ReactDOM.render(
    <div>
    <NavbarContainer names={names} links={links} dropdownNames={dropdownNames} searchPlaceholder={searchPlaceholder}/>
    <LoginForm />
    </div>,
    document.getElementById('main')
);
