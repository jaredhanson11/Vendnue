import React from 'react';

import * as styles from '../static/js/style.js';
import {sectionDataSectionStyle as jsCSS} from '../static/js/style.js';

import { Row, Col, Panel, Tabs, Tab} from 'react-bootstrap';

export default class SocialMediaPanel extends React.Component {
    render() {

        return (
            <Row style={{marginTop: '3%', height:'90%'}} >
                <Col xsOffset={2} xs={8} style={jsCSS.mainCol} >
                    <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
                        <Tab eventKey={1} title="Facebook">
                            <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fchancetherapper%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=928912173838257" width={340} height={500} style={{border: 'none', overflow: 'hidden'}} scrolling="yes" frameBorder={0} allowTransparency="true" />
                        </Tab>
                        <Tab eventKey={2} title="Twitter">
                        </Tab>
                    </Tabs>
                </Col>
             </Row>
        )
    }
}
