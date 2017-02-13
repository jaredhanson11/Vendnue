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

    selectSection(section) {
        this.props.dispatch({type : actionTypes.SELECT_SECTION, section: section});
    }

    render(){
        if (this.props.concertApiCall.error) {return (<p>Error</p>)}
        return (
            <Loader loaded={!this.props.concertApiCall.loading}>
                <ConcertContainerMainTitle title={this.props.title.name}/ >
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
