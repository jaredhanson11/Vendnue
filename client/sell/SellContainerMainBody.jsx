import React from 'react';
import Immutable from 'immutable';

import {Row, Col} from 'react-bootstrap';

import { actionCreators } from '../actions';

import SellSearchBar from './SellSearchBar.jsx';

import Loader from 'react-loader';

import { sellContainerMainBodyStyle as jsCSS } from '../static/js/style.js';

export default class SellContainerMainBody extends React.Component{


    handleSubmit(event) {
        event.preventDefault();
        const concertId = event.target.concert.value;
        const sectionId = event.target.section.value;
        const numberOfTickets = event.target.number.value;
        const priceOfTickets = event.target.price.value;
        console.log(concertId);
        console.log(sectionId);
        console.log(numberOfTickets);
        console.log(priceOfTickets);
        this.props.postConcertTickets(concertId,sectionId,numberOfTickets,priceOfTickets);
    }

    render(){

        const top = (
            <div>
                <Row style={jsCSS.mainRow} >
                <Col xs={12}>
                    What concert are you selling tickets for? <br/>
                    <SellSearchBar concertQuery={this.props.concertQuery} enterQuery={this.props.enterQuery}
                    concertQueryApiCall={this.props.concertQueryApiCall} selectQuery={this.props.selectQuery}
                    getConcertInfo={this.props.getConcertInfo}/>

                </Col>
                </Row>
            </div>
        );

        const maxNumberOfTickets = 12;

        const middle = (
            <div>
                <Loader loaded={!this.props.concertInfoApiCall.loading} >
                    <Row style={jsCSS.mainRow1} >
                        <Col xs={12}>
                            <div>Concert: {this.props.concertInfoApiCall.concert.name}</div>
                            <div>Date: {this.props.concertInfoApiCall.concert.date}</div>
                            <div>Average Ticket Price: {this.props.concertInfoApiCall.concert.ticket_summary.average_ticket_price}</div>
                            <div>Average Sold Ticket Price: {this.props.concertInfoApiCall.concert.sold_ticket_summary.average_sold_ticket_price}</div>
                            <div>Average Section Bid: {this.props.concertInfoApiCall.concert.section_bid_summary.average_price}</div>
                            <div>Average Successful Section Bid: {this.props.concertInfoApiCall.concert.cleared_section_bid_summary.average_price}</div>

                    <form onSubmit={this.handleSubmit.bind(this)}>
                        Sell Your Tickets: <br/>

                        <input hidden name="concert" value={this.props.concertInfoApiCall.concert.id} />

                        Section: <select name="section">
                            {this.props.concertInfoApiCall.concert.map.sections.map((x) => <option value={x.id}>{x.name}</option>)}
                        </select><br/>

                        Number of Tickets: <select name="number">
                            {[...Array(maxNumberOfTickets).keys()].map((x) => <option value={x}>{x}</option>)}
                        </select><br/>

                        Price: <input type="text" name="price" /><br/>
                        
                        <input type="submit" value="Submit" />
                    </form>
                      </Col>
                    </Row>
                </Loader>
            </div>
        );

        const end = (
            <div>{this.props.postTickets}</div>
        );

        let buffer = [top];

        if (this.props.concertQuery.selected) {
            buffer.push(middle);
        }

        if (this.props.postTickets.loaded) {
            buffer.push(end);
        }

        return <div>{buffer}</div>;
    }
}
