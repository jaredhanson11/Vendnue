import React from 'react';
// import apiUtils from './api_utils.js';
import Dropdown from './dropdown.jsx';
import Searchbar from './searchbar.jsx'

export default class NavbarContainer extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            names: ['Vendnue', 'Find Events','Sell Tickets','My Tickets', 'Login','Sign Up'],
            links: ['#','#','#','#','/login','/signup'],
            dropdownNames: props.dropdownNames,
            searchPlaceholder: 'Search for genres, artists, teams, or venues'
        }
    }

    render(){
        // creating the main navbar
        var names = this.state.names;
        var dropdownNames = this.state.dropdownNames;
        var nameStateBar = names.map((name, i) => <li key={name}><a href={this.state.links[i]}>{name}</a></li>);
        return (<ul>
            {nameStateBar}
            <Searchbar searchPlaceholder={this.state.searchPlaceholder} />
            <Dropdown dropdownNames={this.state.dropdownNames} />
        </ul>);
    }
}
