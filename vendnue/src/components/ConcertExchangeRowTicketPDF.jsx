import React from 'react';

import {Row, Col} from 'react-bootstrap';

export default class ConcertExchangeRowTicketPDF extends React.Component{
    render() {
        return (
            <Row >
                <Col xs={12} style={{height: '100%'}} >
                    <a href='#'>Ticket</a>
                </Col>
            </Row>
        )
    }
}
