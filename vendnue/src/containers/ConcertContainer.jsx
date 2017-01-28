import React from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import Loader from 'react-loader';

import { actionCreators } from '../actions';
import MainLayout from './Layout.jsx';

import ConcertContainerMainBody from './ConcertContainerMainBody.jsx';


class ConcertContainer extends React.Component {

    componentWillMount() {
        const url = window.location.href;
        const concertID = url.split('/').pop();
        this.props.dispatch(actionCreators.getConcert(concertID));
    }

    render(){
        var concert = this.props.concert;

        if (concert.error) {return (<p>Error</p>)}
        return (
            <Loader loaded={concert.isLoaded}>
                <MainLayout mainTitle='Concert' mainBody={ConcertContainerMainBody} />
            </Loader>
        )
    }

}

var mapStateToProps = function(state) {
    var immutableState = Immutable.fromJS(state);
    var newState = immutableState.toJS()
    return newState
}

export default connect(mapStateToProps)(ConcertContainer);
