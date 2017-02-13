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
            <div>
                <Row style={jsCSS.mainRow} >
                    <Col xs={6} style={jsCSS.leftMainOuterDiv} >
                        <ConcertMapSection map={this.props.mapBox.map} />
                        <SectionDataSection concertDataSummary={this.props.mapBox.concertDataSummary} />
                    </Col>
                    <Col xs={6} style={jsCSS.rightMainOuterDiv} >
                        <ConcertExchangeSection ticketsExhcange={this.props.ticketsBox.ticketsExhcange />
                    </Col>
                </Row>
                <Row style={jsCSS.footerOuterDiv} >
                    <Col xs={12}>Twitter</Col>
                </Row>
            </div>
        )
    }
}
