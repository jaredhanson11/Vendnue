import React from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import Loader from 'react-loader';
import { Grid } from 'react-bootstrap';

import { actionCreators } from '../actions';

import { concertContainerStyle as jsCSS } from '../static/js/style.js';

import ConcertContainerMainBody from './ConcertContainerMainBody.jsx';
import ConcertContainerMainTitle from './ConcertContainerMainTitle.jsx';


class ConcertContainer extends React.Component {

    componentWillMount() {
        const url = window.location.href;
        const concertID = url.split('/').pop();
        this.props.dispatch(actionCreators.getConcert(concertID));
    }

    toggleSection(e) {
        this.props.dispatch(actionCreators.toggleSection(e.currentTarget.id));
    }

    render(){
        if (this.props.concertApiCall.error) {return (<p>Error</p>)}
        return (
            <Grid style={jsCSS.mainContainer}>
                <Loader loaded={!this.props.concertApiCall.loading} >
                    <ConcertContainerMainTitle title={this.props.title} />
                    <ConcertContainerMainBody mapBox={this.props.mapBox}
                                              ticketsBox={this.props.ticketsBox}
                                              socialMediaBox={this.props.socialMediaBox}
                                              actions={{toggleSection: this.toggleSection.bind(this)}}/>
                </Loader>
            </Grid>
        )
    }

}

var mapStateToProps = function(state) {
    var immutableState = Immutable.fromJS(state);
    var newState = immutableState.toJS()
    return newState
}

export default connect(mapStateToProps)(ConcertContainer);
