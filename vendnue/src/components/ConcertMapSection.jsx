import React from 'react';

import GeneralAdmissionMap from './GeneralAdmissionMap.jsx';

import {Row, Col} from 'react-bootstrap';

export default class ConcertMapSection extends React.Component{
    render(){
        return (
                <Row style={{height: '60%', marginTop: '10%'}} >
                    <Col xsOffset={2} xs={8} ><GeneralAdmissionMap /></Col>
                </Row>
        )
    }
}
