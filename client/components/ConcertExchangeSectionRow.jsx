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

        var mainRowStyle = Object.assign({}, jsCSS.mainRow);

        if (this.props.section.isActive) {mainRowStyle = Object.assign(mainRowStyle, jsCSS.activeSection);}
        else if (this.props.section.isHovered) {mainRowStyle = Object.assign(mainRowStyle, jsCSS.hoveredSection);}

        return (
                <div>
                    <Col style={mainRowStyle} id={this.props.section.id}
                        onClick={this.props.actions.toggleSection} onMouseEnter={this.props.actions.toggleHoverSection} onMouseLeave={this.props.actions.toggleHoverSection} >
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
