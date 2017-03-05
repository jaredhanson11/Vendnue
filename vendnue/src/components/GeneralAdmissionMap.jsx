import React from 'react';
import { ButtonGroup, Button, Row, Col } from 'react-bootstrap';

import { noGutters } from '../static/js/style.js';
import { actionCreators, actionTypes } from '../actions';

import ConcertMapDataModal from './ConcertMapDataModal.jsx';

export default class GeneralAdmissionMap extends React.Component {

    render() {
        return (
            <Row>
                <Col xs={6} style={noGutters} >
                    <ButtonGroup vertical block >
                        <Button id='1' bsStyle='danger' onClick={this.props.actions.toggleSection} style={{ height: '100%' }} >GA</Button>
                    </ButtonGroup>
                </Col>
                <Col xs={6} style={noGutters} >
                    <ButtonGroup vertical block >
                        <Button id='2' bsStyle='success' onClick={this.props.actions.toggleSection} style={{ height: '100%' }} >VIP</Button>
                    </ButtonGroup>
                </Col>
            </Row>
        )
    }
}
