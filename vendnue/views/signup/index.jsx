import React from 'react';
import ReactDOM from 'react-dom';

import NavbarContainer from '../react_components/navbar_container.jsx'
import SignupForm from './react/signup_form.jsx'

// login page params
var dropdownNames = ['Sign in','My Hub','Gift Codes','Settings'];

ReactDOM.render(
    <div>
    <NavbarContainer dropdownNames={dropdownNames}/>
    <SignupForm searchPlaceholder={searchPlaceholder} names={names} links={links} dropdownNames={dropdownNames} /> 
    </div>,
    document.getElementById('main')
);
