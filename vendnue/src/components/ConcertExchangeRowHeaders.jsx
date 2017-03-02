import React from 'react';
import {Row, Col} from 'react-bootstrap';

import { concertExchangeRowHeadersStyle as jsCSS } from '../static/js/style.js';

export default class ConcertExchangeRowHeaders extends React.Component{
    render(){
        return (
        <tr style={jsCSS.mainRow} >
            <th style={jsCSS.priceHeader} >Price</th>
            <th>Foo</th>
            <th>Bar</th>
        </tr>
        )
    }
}
