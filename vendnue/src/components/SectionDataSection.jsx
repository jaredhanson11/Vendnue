// Rename this later. Don't use section to describe these containers, like ConcertMapSection
import React from 'react';

import {Row, Col} from 'react-bootstrap';
export default class SectionDataSection extends React.Component{
    render(){
        return (
                <Row style={{marginTop: '3%', height:'25%'}} >
                    <Col xsOffset={2} xs={8} style={{border: 'solid 1px blue', height: '100%'}} ><h1>This is some text</h1></Col>
                </Row>
        )
    }
}
