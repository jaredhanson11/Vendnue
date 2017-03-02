import React from 'react';
import {Row, Col} from 'react-bootstrap';

import { concertExchangeSectionStyle as jsCSS } from '../static/js/style.js';
import ConcertExchangeRow from './ConcertExchangeRow.jsx';
import ConcertExchangeSectionRow from './ConcertExchangeSectionRow.jsx';

export default class ConcertExchangeSection extends React.Component{
    render(){
        var sections = [];
        this.props.ticketsExchange.sections.map((section) => {
            if (this.props.ticketsExchange.activeSection === section.id.toString()) {var isActive = true;}
            else {var isActive = false;}
            console.log(isActive);
            sections.push((<ConcertExchangeSectionRow section={section} isActive={isActive} actions={this.props.actions} />));
        })
        return (
                <Row style={jsCSS.mainRow} >
                    <Col xsOffset={2} xs={8} style={jsCSS.ticketsExchange} >
                        {sections}
                    </Col>
                </Row>
        )
    }
}
