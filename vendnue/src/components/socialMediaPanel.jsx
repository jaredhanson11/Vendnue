import React from 'react';
import * as styles from '../static/js/style.js';

import { Row, Col, Panel} from 'react-bootstrap';

export default class SocialMediaPanel extends React.Component {
    render() {
        // const tweetData = this.props.tweetData;
        // const user = '@' + tweetData.user;
        return (
            <Row>
                <Col xs={6} style={styles.noGutters} >
                    <Panel style={styles.socialMediaPanelStyle.general}>
                        Twitter
                    </Panel>
                </Col>
            </Row>
        )
    }
}
