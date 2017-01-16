import React from 'react';
// import apiUtils from './api_utils.js'
import NavbarContainer from './navbar_container.jsx'

export default class SignupPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            names: props.names,
            dropdownNames: props.dropdownNames,
            links:props.links
        }

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.login = this.login.bind(this);
    }

    handleEmailChange(event) {
        this.setState({'email': event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({'password': event.target.value});
    }

    login() {
        // const paramsObj = {email: this.state.email, password: this.state.password};
        // var response = apiUtils.post('/auth/login', paramsObj);
        // validate that it is a successful request
        this.setState({dropdownNames:['My Account','Settings']});
    }

    render(){
        return (
            <div>
                <NavbarContainer names={this.state.names} links={this.state.links} dropdownNames={this.state.dropdownNames} />
                <div className="form-group">
                    <label>Email address</label>
                    <input type='email' name='email' value={this.state.email} onChange={this.handleEmailChange} placeholder="Enter email"></input>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name='password' className="form-control" value={this.state.password} onChange={this.handlePasswordChange} id="exampleInputPassword1" placeholder="Password"></input>
                </div>
                <button type="submit" onClick={this.login}>Submit</button>
            </div>);
    }
}
