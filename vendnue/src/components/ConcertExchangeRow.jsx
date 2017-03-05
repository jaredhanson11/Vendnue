import React from 'react';
import {Row, Col, Button} from 'react-bootstrap';

import { concertExchangeRowStyle as jsCSS } from '../static/js/style.js';

export default class ConcertExchangeRow extends React.Component{
    render(){
        return (
                <Col style={jsCSS.mainRow} >
                    <Col xs={3} style={jsCSS.ticketPrice} >${this.props.ticket.price} /ea</Col>
                </Col>
        )
    }
}
