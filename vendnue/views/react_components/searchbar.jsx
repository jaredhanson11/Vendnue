import React from 'react';
// import apiUtils from './api_utils.js'

export default class Searchbar extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            value:'',
            searchPlaceholder: props.searchPlaceholder
        }

        this.handleSearch = this.handleSearch.bind(this);
    }

    // here we call api for autocomplete and we display them in the html
    // have to lookup how to display popup for searchbar
    handleSearch(event) {
        this.setState({'value':event.target.value});
        // const paramsObj = {email: this.state.email, password: this.state.password};
        // var response = apiUtils.post('/auth/login', paramsObj);
        // validate that it is a successful request
    }

    render() {
        return (<input type="text" name="search" placeholder={this.state.searchPlaceholder} onChange={this.handleSearch} />);
    }
}