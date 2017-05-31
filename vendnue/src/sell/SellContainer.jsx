import React from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import Loader from 'react-loader';
import { Grid } from 'react-bootstrap';

import { actionCreators } from '../actions';

// import { concertContainerStyle as jsCSS } from '../static/js/style.js';

import SellContainerMainBody from './SellContainerMainBody.jsx';

class SellContainer extends React.Component {

    componentWillMount() {

    }

    render(){
        return (
            <SellContainerMainBody />
        )
    }

}

var mapStateToProps = function(state) {
    var immutableState = Immutable.fromJS(state);
    var newState = immutableState.toJS()
    return newState
}

export default connect(mapStateToProps)(SellContainer);
