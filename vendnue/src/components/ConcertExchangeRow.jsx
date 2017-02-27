import React from 'react';
import {Row, Col} from 'react-bootstrap';

import { concertExchangeRowStyle as jsCSS } from '../static/js/style.js';
import ConcertExchangeRowPrice from './ConcertExchangeRowPrice.jsx';

export default class ConcertExchangeRow extends React.Component{
    render(){
        return (
                <Row style={jsCSS.mainRow} >
                    <Col xs={2} style={jsCSS.ticketPrice} >
                        <ConcertExchangeRowPrice price={this.props.ticket.price} />
                    </Col>
                </Row>
        )
    }
}
