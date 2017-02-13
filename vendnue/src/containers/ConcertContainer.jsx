import React from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import Loader from 'react-loader';

import { actionCreators } from '../actions';

import ConcertContainerMainBody from './ConcertContainerMainBody.jsx';
import ConcertContainerMainTitle from './ConcertContainerMainTitle.jsx';


class ConcertContainer extends React.Component {

    componentWillMount() {
        const url = window.location.href;
        const concertID = url.split('/').pop();
        this.props.dispatch(actionCreators.getConcert(concertID));
    }

    handleDataModal(section) {
        console.log('Handle data call');
        this.props.dispatch({type : actionTypes.SHOW_DATA_MODAL, activeModal: section});
    }

    render(){
        if (concert.error) {return (<p>Error</p>)}
        return (
            <Loader loaded={!this.props.concertApiCall.loading}>
                <ConcertContainerMainTitle title={this.props.title}/ >
                <ConcertContainerMainBody mapBox={this.props.mapBox}
                                          ticketsBox={this.props.ticketsBox}
                                          socialMediaBox={this.props.socialMediaBox} />
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
