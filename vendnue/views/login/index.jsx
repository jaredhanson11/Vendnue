import React from 'react';
import ReactDOM from 'react-dom';

import NavbarContainer from '../react_components/navbar_container.jsx'
import LoginForm from './react/login_form.jsx'

// login page params
var dropdownNames = ['Sign in','My Hub','Gift Codes','Settings'];

// main, header, footer 
ReactDOM.render(
    <div>
    <NavbarContainer dropdownNames={dropdownNames} />
    <LoginForm />
    </div>,
    document.getElementById('main')
);
