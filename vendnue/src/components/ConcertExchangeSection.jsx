import React from 'react';

import {Row, Col} from 'react-bootstrap';

import ConcertExchangeRow from './ConcertExchangeRow.jsx';

export default class ConcertExchangeSection extends React.Component{
    render(){
        return (
                <Row style={{height: '60%', marginTop: '10%'}} >
                    <Col xsOffset={2} xs={8} style={{border: 'thin solid black'}} >
                        <ConcertExchangeRow />
                        <ConcertExchangeRow />
                        <ConcertExchangeRow />
                        <ConcertExchangeRow />
                        <ConcertExchangeRow />
                        <ConcertExchangeRow />
                        <ConcertExchangeRow />
                        <ConcertExchangeRow />
                        <ConcertExchangeRow />
                        <ConcertExchangeRow />
                        <ConcertExchangeRow />
                        <ConcertExchangeRow />
                        <ConcertExchangeRow />
                        <ConcertExchangeRow />
                        <ConcertExchangeRow />
                        <ConcertExchangeRow />
                    </Col>
                </Row>
        )
    }
}
