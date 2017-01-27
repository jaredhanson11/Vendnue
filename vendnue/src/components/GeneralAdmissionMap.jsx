import React from 'react';

import { ButtonGroup, Button, Row, Col } from 'react-bootstrap';

export default class GeneralAdmissionMap extends React.Component {
    render() {
        return (
            <Row style={{marginRight: 0, marginLeft: 0, height: '100%'}} >
                <Col xs={6} style={{paddingRight: 0, paddingLeft: 0}} >
            <ButtonGroup style={{barder: '2px solid green' }} vertical block >
                <Button bsStyle='danger' style={{ height: '100%' }} >GA</Button>
            </ButtonGroup>
                </Col>
                <Col xs={6} style={{paddingRight: 0, paddingLeft: 0}} >
            <ButtonGroup style={{barder: '2px solid green' }} vertical block >
                <Button bsStyle='success' style={{ height: '100%' }}>VIP</Button>
            </ButtonGroup>
                </Col>
            </Row>
        )
    }
}
