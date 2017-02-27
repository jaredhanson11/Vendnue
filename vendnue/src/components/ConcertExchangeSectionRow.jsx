import React from 'react';
import { Row, Col, Collapse } from 'react-bootstrap';

import { concertExchangeSectionRowStyle as jsCSS } from '../static/js/style.js';
import ConcertExchangeRow from './ConcertExchangeRow.jsx';

export default class ConcertExchangeSectionRow extends React.Component{
    render(){
        var tickets = [];
        this.props.section.tickets.map((tick) => {
            tickets.push((<ConcertExchangeRow ticket={tick} />));
        });
        return (
                <div>
                    <Row style={jsCSS.mainRow} >
                        Section: {this.props.section.name} <br/>
                        Low Ticket Price: {this.props.section.ticket_summary.lo_ticket_price} <br/>
                        Ticket Volume: {this.props.section.ticket_summary.volume_tickets} <br/>
                    </Row>
                    <Row>
                        <Collapse in={this.props.isActive}>
                            <div>
                                {tickets}
                            </div>
                        </Collapse>
                    </Row>
                </div>
        )
    }
}
