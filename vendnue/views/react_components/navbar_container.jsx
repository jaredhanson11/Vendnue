import React from 'react';
// import apiUtils from './api_utils.js';
import Dropdown from './dropdown.jsx';

export default class NavbarContainer extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            names: props.names,
            links:props.links,
            dropdownNames: props.dropdownNames,
        }
    }

    render(){
        // creating the main navbar
        var names = this.state.names;
        var dropdownNames = this.state.dropdownNames;
        var nameStateBar = names.map((name, i) => <li key={name}><a href={this.state.links[i]}>{name}</a></li>);

        return (<ul>
            {nameStateBar}
            <Dropdown dropdownNames={this.state.dropdownNames} />
        </ul>);
    }
}
