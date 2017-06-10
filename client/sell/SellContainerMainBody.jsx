import React from 'react';
import Immutable from 'immutable';

import {Row, Col} from 'react-bootstrap';

import { actionCreators } from '../actions';

import SellSearchBar from './SellSearchBar.jsx';

import Loader from 'react-loader';

import { sellContainerMainBodyStyle as jsCSS } from '../static/js/style.js';

export default class SellContainerMainBody extends React.Component{


    handleSubmit(event) {
        console.log(event);
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
                        Section: <select name="section">
                            {this.props.concertInfoApiCall.concert.map.sections.map((x) => <option value={x.id}>{x.name}</option>)}
                        </select>
                        Number of Tickets: <select name="number">
                            {[1,2,3,4,5,6,7,8,9,10,11,12].map((x) => <option value={x}>{x}</option>)}
                        </select>
                        
                        <input type="submit" value="Submit" />
                    </form>
                      </Col>
                    </Row>
                </Loader>
            </div>
        );

        let buffer = [top];

        if (this.props.concertQuery.selected) {
            buffer.push(middle);
        }

        return <div>{buffer}</div>;
    }
}
