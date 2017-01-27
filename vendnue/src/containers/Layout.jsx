import React from 'react';
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';

export default class MainLayout extends React.Component {
    render() {
        var mainBodyComponent = this.props.mainBody;
        return (
        <Grid fluid >
            <Row style={{border: '2px solid red'}} >
                <Col smOffset={1} sm={10} style={{border: '2px solid white', wordWrap: 'break-word'}} ><this.props.mainBody /></Col>
            </Row>
        </Grid>
        );
    }
}
