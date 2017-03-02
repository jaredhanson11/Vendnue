// Rename this later. Don't use section to describe these containers, like ConcertMapSection
import React from 'react';

import {Row, Col, Tabs, Tab} from 'react-bootstrap';

export default class SectionDataSection extends React.Component{
    render(){

        const sectionBidSummary = this.props.concertDataSummary.sectionBid;
        const ticketSummary = this.props.concertDataSummary.ticket;
        const soldTicketSummary = this.props.concertDataSummary.soldTicket;
        // could be made more modular
        return (
                <Row style={{marginTop: '3%', height:'75%'}} >
                    <Col xsOffset={2} xs={8} style={{border: 'solid 1px blue'}} >
                    <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
                        <Tab eventKey={1} title="Bid">
                            <div>Volume: {(Math.round(sectionBidSummary['volume_bids']*100)/100).toFixed(2)}</div>
                            <div>Average Price: {(Math.round(sectionBidSummary['average_price']*100)/100).toFixed(2)}</div>
                            <div>Hi: {(Math.round(sectionBidSummary['hi_bid_price']*100)/100).toFixed(2)}</div>
                            <div>Low: {(Math.round(sectionBidSummary['lo_bid_price']*100)/100).toFixed(2)}</div>
                            <div>Variance: {(Math.round(sectionBidSummary['variance_price']*100)/100).toFixed(2)}</div>
                        </Tab>
                        <Tab eventKey={2} title="Ask">
                            <div>Volume: {(Math.round(ticketSummary['volume_tickets']*100)/100).toFixed(2)}</div>
                            <div>Average Price: {(Math.round(ticketSummary['average_ticket_price']*100)/100).toFixed(2)}</div>
                            <div>Hi: {(Math.round(ticketSummary['hi_ticket_price']*100)/100).toFixed(2)}</div>
                            <div>Low: {(Math.round(ticketSummary['lo_ticket_price']*100)/100).toFixed(2)}</div>
                            <div>Variance: {(Math.round(ticketSummary['variance_ticket_price']*100)/100).toFixed(2)}</div>
                        </Tab>
                        <Tab eventKey={3} title="Sold">
                            <div>Volume: {(Math.round(soldTicketSummary['volume_sold_tickets']*100)/100).toFixed(2)}</div>
                            <div>Average Price: {(Math.round(soldTicketSummary['average_sold_ticket_price']*100)/100).toFixed(2)}</div>
                            <div>Hi: {(Math.round(soldTicketSummary['hi_sold_ticket_price']*100)/100).toFixed(2)}</div>
                            <div>Low: {(Math.round(soldTicketSummary['lo_sold_ticket_price']*100)/100).toFixed(2)}</div>
                            <div>Variance: {(Math.round(soldTicketSummary['variance_sold_ticket_price']*100)/100).toFixed(2)}</div>
                        </Tab>
                    </Tabs>
                    </Col>
                </Row>
        )
    }
}
