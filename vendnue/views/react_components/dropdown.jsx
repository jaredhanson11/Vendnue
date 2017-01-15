import React from 'react';
import apiUtils from './api_utils.js';

export default class Dropdown extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            dropdownNames: props.dropdownNames
        }
    }

    render(){
        var dropdownNames = this.state.dropdownNames;
        var dropdownComp = dropdownNames.map((name) => <option key={name} value={name}>{name}</option>);

        return (<select>
            {dropdownComp}
        </select>);
    }
}