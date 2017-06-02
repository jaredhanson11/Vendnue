import React from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import Loader from 'react-loader';
import { Grid } from 'react-bootstrap';

import { actionCreators } from '../actions';

import { sellContainerStyle as jsCSS } from '../static/js/style.js';

import SellContainerMainBody from './SellContainerMainBody.jsx';

class SellContainer extends React.Component {

    componentWillMount() {
        this.props.dispatch(actionCreators.getConcerts());
    }

    getConcertInfo(id) {
        this.props.dispatch(actionCreators.getConcertInfo(id));
    }

    enterQuery(query) {
        this.props.dispatch(actionCreators.concertQuery(query));
    };

    selectQuery() {
        this.props.dispatch(actionCreators.selectQuery());
    }

    render(){
        return (
           <Grid style={jsCSS.mainContainer}>
                <SellContainerMainBody concertQueryApiCall={this.props.concertQueryApiCall} enterQuery={this.enterQuery.bind(this)} 
                concertQuery={this.props.concertQuery} getConcertInfo={this.getConcertInfo.bind(this)} selectQuery={this.selectQuery.bind(this)} 
                concertInfoApiCall={this.props.concertInfoApiCall}/>
           </Grid>
        )
    }

}

var mapStateToProps = function(state) {
    var immutableState = Immutable.fromJS(state);
    var newState = immutableState.toJS();
    return newState
}

export default connect(mapStateToProps)(SellContainer);
