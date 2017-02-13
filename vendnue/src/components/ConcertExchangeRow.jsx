import React from 'react';
import {Row, Col} from 'react-bootstrap';

import { concertExchangeRowStyle as jsCSS } from '../static/js/style.js';
import ConcertExchangeRowPrice from './ConcertExchangeRowPrice.jsx';
import ConcertExchangeRowTicketPDF from './ConcertExchangeRowTicketPDF.jsx';

export default class ConcertExchangeRow extends React.Component{
    render(){
        return (
                <Row style={jsCSS.mainRow} >
                    <Col xs={2} style={jsCSS.linkToTicket} >
                        <ConcertExchangeRowTicketPDF />
                    </Col>
                    <Col xs={2} style={jsCSS.ticketPrice} >
                        <ConcertExchangeRowPrice price={this.props.section_bid.bid_price_per_ticket} />
                    </Col>
                </Row>
        )
    }
}
