import React from 'react';
import {Row, Col} from 'react-bootstrap';

import { concertExchangeSectionRowHeadersStyle as jsCSS } from '../static/js/style.js';

export default class ConcertExchangeSectionRowHeaders extends React.Component{
    render(){
        return (
                <tr style={jsCSS.mainRow} >
                    <th style={jsCSS.sectionHeader} >Section</th>
                    <th style={jsCSS.sectionHeader} >Data</th>
                </tr>
        )
    }
}
