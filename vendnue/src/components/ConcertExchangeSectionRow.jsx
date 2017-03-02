import React from 'react';
import { Row, Col, Collapse, Table } from 'react-bootstrap';

import { concertExchangeSectionRowStyle as jsCSS } from '../static/js/style.js';
import ConcertExchangeRow from './ConcertExchangeRow.jsx';
import ConcertExchangeRowHeaders from './ConcertExchangeRowHeaders.jsx';
import ConcertExchangeSectionRowHeaders from './ConcertExchangeSectionRowHeaders.jsx';

export default class ConcertExchangeSectionRow extends React.Component{
    render(){
        var tickets = [];
        this.props.section.tickets.map((tick) => {
            tickets.push((<ConcertExchangeRow ticket={tick} />));
        });

        if (this.props.isActive) {var mainRowStyle = Object.assign({}, jsCSS.mainRow, jsCSS.activeSection);}
        else {var mainRowStyle = jsCSS.mainRow;}

        return (
                <div>
                    <Row style={mainRowStyle} id={this.props.section.id} onClick={this.props.actions.selectSection} >
                    <Table >
                        <thead>
                        <ConcertExchangeSectionRowHeaders />
                        </thead>
                        <tbody>
                        </tbody>
                        <tr>
                            <td style={jsCSS.sectionName} >{this.props.section.name}</td>
                            <td style={jsCSS.sectionName} >
                                Low Ticket Price: {this.props.section.ticket_summary.lo_ticket_price} <br/>
                                Ticket Volume: {this.props.section.ticket_summary.volume_tickets} <br/>
                            </td>
                        </tr>
                    </Table>
                    </Row>
                    <Row>
                        <Col xs={12} >
                        <Collapse in={this.props.isActive}>
                            <Row style={jsCSS.sectionTicketRows} >
                                <Table >
                                    <thead>
                                        <ConcertExchangeRowHeaders />
                                    </thead>
                                    <tbody>
                                    {tickets}
                                    </tbody>
                                </Table>
                            </Row>
                        </Collapse>
                        </Col>
                    </Row>
                </div>
        )
    }
}
