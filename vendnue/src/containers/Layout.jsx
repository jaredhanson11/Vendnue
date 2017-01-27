import React from 'react';
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';

import * as styles from '../static/js/style.js';

export default class MainLayout extends React.Component {
    render() {
        var mainBodyComponent = this.props.mainBody;
        var mainTitleComponent
        if (this.props.mainTitle) {
            mainTitleComponent = <h4>{this.props.mainTitle}</h4>;
        } else {
            mainTitleComponent = <div></div>
        }
        return (
        <Grid fluid >
            <Row style={styles.addBorder('red')} >
                <Col smOffset={1} sm={10} style={Object.assign({wordWrap: 'break-word'}, styles.addBorder('white'))} >
                    {mainTitleComponent}
                    <this.props.mainBody />
                </Col>
            </Row>
        </Grid>
        );
    }
}
