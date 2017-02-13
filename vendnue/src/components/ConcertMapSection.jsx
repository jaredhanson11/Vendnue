import React from 'react';
import {Row, Col} from 'react-bootstrap';

import { concertMapSectionStyle as jsCSS } from '../static/js/style.js';
import GeneralAdmissionMap from './GeneralAdmissionMap.jsx';

export default class ConcertMapSection extends React.Component{

    render(){

        return (
                <Row style={jsCSS.mainRow} >
                    <Col xsOffset={2} xs={8} ><GeneralAdmissionMap map={this.props.map} /></Col>
                </Row>
        )
    }
}
