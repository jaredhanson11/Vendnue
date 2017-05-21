import React from 'react';
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';

import * as styles from '../static/js/style.js';

import Title from '../components/Title.jsx';

export default class MainLayout extends React.Component {
    render() {
        var MainBodyComponent = this.props.mainBody;
        var MainTitleComponent = this.props.mainTitle;
        return (
            <Grid fluid >
                <Row>
                    <Col xs={12} >
                        {MainTitleComponent}
                        {MainBodyComponent}
                    </Col>
                </Row>
            </Grid>
        );
    }
}
