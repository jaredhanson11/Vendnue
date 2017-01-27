import React from 'react';
import * as styles from '../static/js/style.js';

import { ButtonGroup, Button, Row, Col } from 'react-bootstrap';

export default class GeneralAdmissionMap extends React.Component {
    render() {
        return (
            <Row>
                <Col xs={6} style={styles.noGutters} >
                    <ButtonGroup vertical block >
                        <Button bsStyle='danger' style={{ height: '100%' }} >GA</Button>
                    </ButtonGroup>
                </Col>
                <Col xs={6} style={styles.noGutters} >
                    <ButtonGroup vertical block >
                        <Button bsStyle='success' style={{ height: '100%' }}>VIP</Button>
                    </ButtonGroup>
                </Col>
            </Row>
        )
    }
}
