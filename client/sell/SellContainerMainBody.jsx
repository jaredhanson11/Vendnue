import React from 'react';
import Immutable from 'immutable';

import {Row, Col} from 'react-bootstrap';

import { actionCreators } from '../actions';

import SellSearchBar from './SellSearchBar.jsx';

import Loader from 'react-loader';

import { sellContainerMainBodyStyle as jsCSS } from '../static/js/style.js';

export default class SellContainerMainBody extends React.Component{

    constructor(props) {
      super(props);
      this.state = {
        section: 0,
        price: 0,
        number: 0,
      };
    }

    handleSubmit(event) {

        console.log(this.state);

        const concertId = this.props.concertInfoApiCall.concert.id;
        const sectionId = this.state.section;
        const price = this.state.price;
        const number = this.state.number;

        this.props.postConcertTickets(concertId,sectionId,number,price);
    }

    handleChange(event) {
        this.setState({[event.target.name] : event.target.value});
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
            
            <input hidden name="concert" value={this.props.concertInfoApiCall.concert.id} />

                        Sell Your Tickets: <br/>

                        Section: <select name="section" onChange={this.handleChange.bind(this)}>
                            {this.props.concertInfoApiCall.concert.map.sections.map((x) => <option value={x.id}>{x.name}</option>)}
                        </select><br/>

                        Price: <input type="text" name="price" onChange={this.handleChange.bind(this)}/><br/>

                        Number of Tickets: <select name="number" onChange={this.handleChange.bind(this)}>
                            {[...Array(maxNumberOfTickets).keys()].map((x) => <option value={x}>{x}</option>)}
                        </select><br/>

                        <button type="submit" onClick={this.handleSubmit.bind(this)}>enter</button>

                      </Col>
                    </Row>
                </Loader>
            </div>
        );

        const end = (
        <div>
            <Row style={jsCSS.mainRow2} >
                <Col xs={12}>
                    Successful ticket posting!
                </Col>
            </Row>
        </div>
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
