import React from 'react';
import {Row, Col} from 'react-bootstrap';

import { concertExchangeSectionStyle as jsCSS } from '../static/js/style.js';
import ConcertExchangeRow from './ConcertExchangeRow.jsx';

export default class ConcertExchangeSection extends React.Component{
    render(){
        return (
                <Row style={jsCSS.mainRow} >
                    <Col xsOffset={2} xs={8} style={jsCSS.ticketExchange} >
                        <ConcertExchangeRow />
                        <ConcertExchangeRow />
                    </Col>
                </Row>
        )
    }
}
