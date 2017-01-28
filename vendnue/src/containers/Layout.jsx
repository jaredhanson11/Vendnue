import React from 'react';
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';

import * as styles from '../static/js/style.js';

import Title from '../components/Title.jsx';

export default class MainLayout extends React.Component {
    render() {
        var MainBodyComponent = this.props.mainBody;
        if (this.props.mainTitle) {var MainTitleComponent = <Title name={this.props.mainTitle} />}
        return (
            <Grid fluid >
                <Row style={styles.addBorder('red')} >
                    <Col smOffset={1} sm={10} style={Object.assign({wordWrap: 'break-word'}, styles.addBorder('white'))} >
                        {MainTitleComponent}
                        <MainBodyComponent />
                    </Col>
                </Row>
            </Grid>
        );
    }
}
