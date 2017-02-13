import React from 'react';

import {Row, Col} from 'react-bootstrap';

import ConcertExchangeRowPrice from './ConcertExchangeRowPrice.jsx';
import ConcertExchangeRowTicketPDF from './ConcertExchangeRowTicketPDF.jsx';

export default class ConcertExchangeRow extends React.Component{
    render(){
        return (
                <Row style={{height: '10%'}} >
                    <Col xs={2} style={{height: '100%', border: 'solid thin white'}} >
                        <ConcertExchangeRowTicketPDF />
                    </Col>
                    <Col xs={2} style={{height: '100%', border: 'solid thin white'}} >
                        <ConcertExchangeRowPrice />
                    </Col>
                </Row>
        )
    }
}
