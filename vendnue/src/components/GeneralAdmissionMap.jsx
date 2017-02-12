import React from 'react';
import * as styles from '../static/js/style.js';

import { ButtonGroup, Button, Row, Col } from 'react-bootstrap';

import { actionCreators, actionTypes } from '../actions';

import ConcertMapDataModal from './ConcertMapDataModal.jsx';

export default class GeneralAdmissionMap extends React.Component {

    render() {
        console.log(this.props);
        return (
            <Row>
                <ConcertMapDataModal showModal={this.props.showDataModal} activeModal={this.props.activeModal}/>
                <Col xs={6} style={styles.noGutters} >
                    <ButtonGroup vertical block onClick={this.props.handleGADataModal}>
                        <Button id='general-admission-section' bsStyle='danger' style={{ height: '100%' }} onClick={this.props.sectionSelect} >GA</Button>
                    </ButtonGroup>
                </Col>
                <Col xs={6} style={styles.noGutters} onClick={this.props.handleVIPDataModal}>
                    <ButtonGroup vertical block >
                        <Button id='vip-section' bsStyle='success' style={{ height: '100%' }} onClick={this.props.sectionSelect} >VIP</Button>
                    </ButtonGroup>
                </Col>
            </Row>
        )
    }
}
