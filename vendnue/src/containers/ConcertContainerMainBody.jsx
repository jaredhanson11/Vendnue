import React from 'react';
import Immutable from 'immutable';

import {Row, Col} from 'react-bootstrap';

import { actionCreators } from '../actions';
import ConcertMapSection from '../components/ConcertMapSection.jsx';
import SectionDataSection from '../components/SectionDataSection.jsx';

export default class ConcertContainerMainBody extends React.Component{
    render(){
        return (
        <div>
            <Row style={{border: 'solid 1px red', height: '80%'}} >
                <Col xs={6} style={{height: '100%', border: 'solid 1px black'}} >
                    <ConcertMapSection />
                    <SectionDataSection />
                </Col>
                <Col xs={6} style={{height: '100%', border: 'solid 1px green'}}></Col>
            </Row>
            <Row style={{height: '20%'}}>
                <Col xs={12}>Twitter</Col>
            </Row>
        </div>
        )
    }
}
