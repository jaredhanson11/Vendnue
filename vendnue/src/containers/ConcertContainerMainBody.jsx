import React from 'react';
import Immutable from 'immutable';

import {Row, Col} from 'react-bootstrap';

import { actionCreators } from '../actions';
import GeneralAdmissionMap from '../components/GeneralAdmissionMap.jsx';

export default class ConcertContainerMainBody extends React.Component{
    render(){
        return (
            <Row style={{height: '20%'}} >
                <Col md={4} ><GeneralAdmissionMap /></Col>
            </Row>
        )
    }
}
