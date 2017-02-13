import React from 'react';

import {Row, Col} from 'react-bootstrap';

export default class ConcertExchangeRowPrice extends React.Component{
    render() {
        return (
            <Row >
                <Col xs={12} style={{height: '100%', border: 'solid thin blue'}} >
                    <p>24.75</p>
                </Col>
            </Row>
        )
    }
}
