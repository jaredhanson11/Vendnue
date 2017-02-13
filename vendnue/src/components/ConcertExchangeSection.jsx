import React from 'react';
import {Row, Col} from 'react-bootstrap';

import { concertExchangeSectionStyle as jsCSS } from '../static/js/style.js';
import ConcertExchangeRow from './ConcertExchangeRow.jsx';

export default class ConcertExchangeSection extends React.Component{
    render(){
        var sectionBids = [];
        this.props.ticketsExchange.sections.map((section) => {
            return section.section_bids.map((curr) => {
                sectionBids.push((<ConcertExchangeRow section_bid={curr}/>))
            })
        })
        return (
                <Row style={jsCSS.mainRow} >
                    <Col xsOffset={2} xs={8} style={jsCSS.ticketExchange} >
                        {sectionBids}
                    </Col>
                </Row>
        )
    }
}
