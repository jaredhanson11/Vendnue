import React from 'react';
import * as styles from '../static/js/style.js';

import { Row, Col, Panel} from 'react-bootstrap';

export default class SocialMediaPanel extends React.Component {
    render() {
        return (
            <Row>
            // created_at, media, id, text, user
            // https://twitter.com/MITengineers/status/833548161306210305
            //
            const tweetData = this.props.tweetData;
            const user = '@' + tweetData.user;
            const 
                <Col xs={6} style={styles.noGutters} >
                    <Panel onClick={ handleClick }>
                    </Panel>
                </Col>
            </Row>
        )
    }
}
