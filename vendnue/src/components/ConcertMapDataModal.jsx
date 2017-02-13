import React from 'react';
import * as styles from '../static/js/style.js';

import { Modal, Row, Col, Button, Tabs, Tab} from 'react-bootstrap';

export default class ConcertMapDataModal extends React.Component {
    render() {
        return (
            <Row>
                <Col xs={6} style={styles.noGutters} >
                    <Modal show={this.props.showModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
                                <Tab eventKey={1} title="Tab 1">Tab 1 content</Tab>
                                <Tab eventKey={2} title="Tab 2">Tab 2 content</Tab>
                                <Tab eventKey={3} title="Tab 3" disabled>Tab 3 content</Tab>
                            </Tabs>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.close}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
        )
    }
}
