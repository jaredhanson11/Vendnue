import React from 'react';
import * as styles from '../static/js/style.js';

import { ButtonGroup, Button, Row, Col } from 'react-bootstrap';

export default class GeneralAdmissionMap extends React.Component {
    render() {
        console.log(this.props);
        return (
            <Row>
                <Col xs={6} style={styles.noGutters} >
                    <ButtonGroup vertical block >
                        <Button id='general-admission-section' bsStyle='danger' style={{ height: '100%' }} onClick={this.props.sectionSelect} >GA</Button>
                    </ButtonGroup>
                </Col>
                <Col xs={6} style={styles.noGutters} >
                    <ButtonGroup vertical block >
                        <Button id='vip-section' bsStyle='success' style={{ height: '100%' }} onClick={this.props.sectionSelect} >VIP</Button>
                    </ButtonGroup>
                </Col>
            </Row>
        )
    }
}
