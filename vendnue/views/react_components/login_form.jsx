import React from 'react';
// import apiUtils from './api_utils.js'

export default class LoginForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
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
        // this.setState({dropdownNames:['My Account','Settings']});
    }

    render(){
        return (
            <div>
                <form>
                    <label>
                    Email:
                    <input type="email" value={this.state.email} onChange={this.handleEmailChange} />
                    <br />
                    Password:
                    <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>);
    }
}
