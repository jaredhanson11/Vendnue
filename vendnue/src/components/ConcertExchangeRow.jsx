import React from 'react';
import {Row, Col, Button} from 'react-bootstrap';

import { concertExchangeRowStyle as jsCSS } from '../static/js/style.js';
import ConcertExchangeRowPrice from './ConcertExchangeRowPrice.jsx';

export default class ConcertExchangeRow extends React.Component{
    render(){
        return (
                <tr style={jsCSS.mainRow} >
                    <td style={jsCSS.ticketPrice} >${this.props.ticket.price} /ea</td>
                    <td></td>
                    <td></td>
                </tr>
        )
    }
}
