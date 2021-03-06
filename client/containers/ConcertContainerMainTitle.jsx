import React from 'react';
import { Row, Col } from 'react-bootstrap';

import { concertContainerMainTitleStyle as jsCSS } from '../static/js/style.js';

export default class ConcertContainerMainTitle extends React.Component {
    render() {
        if (this.props.title === undefined){return <div></div>}
        var k = 0;
        var artists = this.props.title.artistsPerforming.map(
            function(curr) {
                const artistUrl = '/artists/' + curr.id;
                k += 1;
                return(
                    <li style={jsCSS.artistName} key={k} ><a href={artistUrl} >{curr.name}</a></li>
                )
            });
        Date.prototype.getDayOfWeek = function(){
            return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][ this.getDay() ];
        };

        Date.prototype.getMonthOfYear = function(){
            return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][ this.getMonth() ];
        };

        var dateObj = new Date(this.props.title.concertDate);
        const dateString = dateObj.getDayOfWeek() + ', ' + dateObj.getMonthOfYear() + ' ' + dateObj.getDate();
        var time =  dateObj.toTimeString().split(' ')[0];
        if (time[0] == '0') {
            time = time.substring(1) + ' AM';
        }
        else if (time[0] == '1') {
            if (time[1] == '1' || time[1] == '0') {
                time = time + ' AM';
            }
            else {
                time = time+ ' PM';
            }
        }
        else if (time[0] == '2') {
            time = String(int(time.substring(0,2))-12) + time.substring(2) + ' PM';
        }
        const dateStringWithTime = dateString + ' at ' + time;

        return (
            <Row style={jsCSS.mainRow} >
                <Col xs={12} style={jsCSS.mainCol}>
                <h2 style={jsCSS.name}> {this.props.title.concertName}<small style={jsCSS.artistList}><ul className="list-unstyled">{artists}</ul></small></h2>
                <p style={jsCSS.date}>{dateStringWithTime}</p>
                </Col>
            </Row>
        )
    }
}
