import React from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import Loader from 'react-loader';

import { actionCreators } from '../actions';
import MainLayout from './Layout.jsx';

import ConcertContainerMainBody from './ConcertContainerMainBody.jsx';
import ConcertContainerMainTitle from './ConcertContainerMainTitle.jsx';


class ConcertContainer extends React.Component {

    componentWillMount() {
        const url = window.location.href;
        const concertID = url.split('/').pop();
        this.props.dispatch(actionCreators.getConcert(concertID));
    }

    // sectionSelect(e) {
    //   e.event.target.id
    //}

    render(){
        var concert = this.props.concert;
        if (concert.error) {return (<p>Error</p>)}
        const MainBody = (<ConcertContainerMainBody concert={concert} />)
        const MainTitle = (<ConcertContainerMainTitle concert={concert}/ >)
        return (
            <Loader loaded={concert.isLoaded}>
                <MainLayout mainBody={MainBody} mainTitle={MainTitle} />
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
