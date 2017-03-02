import React from 'react';
import Immutable from 'immutable';

import {Row, Col} from 'react-bootstrap';

import { actionCreators } from '../actions';
import ConcertMapSection from '../components/ConcertMapSection.jsx';
import SectionDataSection from '../components/SectionDataSection.jsx';
import ConcertExchangeSection from '../components/ConcertExchangeSection.jsx';

import { concertContainerMainBodyStyle as jsCSS } from '../static/js/style.js';

export default class ConcertContainerMainBody extends React.Component{
    render(){
        return (
                <Row style={jsCSS.mainRow} >
                    <Col xs={4} style={jsCSS.mapBox} >
                        <ConcertMapSection map={this.props.mapBox.map} actions={this.props.actions} />
                        <SectionDataSection concertDataSummary={this.props.mapBox.concertDataSummary} />
                    </Col>
                    <Col xs={4} style={jsCSS.ticketsBox} >
                        <ConcertExchangeSection ticketsExchange={this.props.ticketsBox.ticketsExchange} actions={this.props.actions} />
                    </Col>
                    <Col xs={4} style={jsCSS.socialMediaBox}></Col>
                </Row>
        )
    }
}
