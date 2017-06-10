import React from 'react';
import {Row, Col} from 'react-bootstrap';

import { concertExchangeSectionStyle as jsCSS } from '../static/js/style.js';
import ConcertExchangeRow from './ConcertExchangeRow.jsx';
import ConcertExchangeSectionRow from './ConcertExchangeSectionRow.jsx';

export default class ConcertExchangeSection extends React.Component{
    render(){
        var sections = [];
        var k = 0;
        this.props.ticketsExchange.sections.map((section) => {
            sections.push((<ConcertExchangeSectionRow section={section} actions={this.props.actions} key={k} />));
            k += 1;
        })
        return (
                <Col xs={12} style={jsCSS.ticketsExchange} >
                    {sections}
                </Col>
        )
    }
}
