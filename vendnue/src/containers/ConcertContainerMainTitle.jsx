import React from 'react';

import { Row, Col } from 'react-bootstrap';


export default class ConcertContainerMainTitle extends React.Component {
    render() {
        if (this.props.concert.payload.concert === undefined){return <div></div>}
        var artists = this.props.concert.payload.concert.artists_performing.map(
            function(curr) {
                const artistUrl = '/artists/' + curr.id;
                return(
                    <a href={artistUrl} >{curr.name} </a>
                )
            });
        Date.prototype.getDayOfWeek = function(){
            return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][ this.getDay() ];
        };
        Date.prototype.getMonthOfYear = function(){
            return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][ this.getMonth() ];
        };
        var dateObj = new Date(this.props.concert.payload.concert.date);
        const dateString = dateObj.getDayOfWeek() + ', ' + dateObj.getMonthOfYear() + ' ' + dateObj.getDate() + ', ' + dateObj.toTimeString();
        console.log(artists);
        console.log(dateObj.toString());
        return (
            <Row style={{leftMargin: '0px'}} >
                <Col xs={12} style={{border: 'solid thin blue'}} >
                <div>{this.props.concert.payload.concert.name}</div>
                <div>{artists}</div>
                <div>{dateString}</div>
                </Col>
            </Row>
        )
    }
}
