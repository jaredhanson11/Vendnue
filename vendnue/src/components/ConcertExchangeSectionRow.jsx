import React from 'react';
import { Row, Col, Collapse, Table } from 'react-bootstrap';

import { concertExchangeSectionRowStyle as jsCSS } from '../static/js/style.js';
import ConcertExchangeRow from './ConcertExchangeRow.jsx';

export default class ConcertExchangeSectionRow extends React.Component{
    render(){
        var tickets = [];
        var k = 0;
        this.props.section.tickets.map((tick) => {
            tickets.push((<ConcertExchangeRow ticket={tick} key={k} />));
            k += 1;
        });

        if (this.props.section.isActive) {var mainRowStyle = Object.assign({}, jsCSS.mainRow, jsCSS.activeSection);}
        else {var mainRowStyle = jsCSS.mainRow;}

        return (
                <div>
                    <Col style={mainRowStyle} id={this.props.section.id} onClick={this.props.actions.toggleSection} >
                            <Col xs={4} style={jsCSS.sectionName} >
                                Section: <strong>{this.props.section.name}</strong>
                            </Col>
                            <Col xs={8} style={jsCSS.sectionName} >
                                Low Ticket Price: <strong>{this.props.section.ticket_summary.lo_ticket_price}</strong><br/>
                                Ticket Volume: <strong>{this.props.section.ticket_summary.volume_tickets}</strong> <br/>
                            </Col>
                    </Col>
                    <Row>
                        <Col xs={12} >
                        <Collapse in={this.props.section.isActive} style={jsCSS.sectionTicketRows} >
                            <Col>
                                {tickets}
                            </Col>
                        </Collapse>
                        </Col>
                    </Row>
                </div>
        )
    }
}
