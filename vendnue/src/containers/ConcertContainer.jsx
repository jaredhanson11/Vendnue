import React from 'react';
import { connect } from 'react-redux';

import { actionCreators } from '../actions';

import Immutable from 'immutable';

class ConcertContainer extends React.Component {

    componentWillMount() {
        const url = window.location.href;
        const concertID = url.split('/').pop();
        this.props.dispatch(actionCreators.getConcert(concertID));
    }

    render(){
        var concert = this.props.concert;

        if (concert.isLoading) {return (<h1>Loading...</h1>)}
        if (concert.error) {return (<p>Error</p>)}
        if (concert.isLoaded) {return (<p>{JSON.stringify(concert.payload)}</p>)} return (
           <p>"this shouldn't happen."</p>
         );
    }

}

var mapStateToProps = function(state) {
    var immutableState = Immutable.fromJS(state);
    var newState = immutableState.toJS()
    return newState
}

export default connect(mapStateToProps)(ConcertContainer);
