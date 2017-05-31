import React from 'react';
import Immutable from 'immutable';

import {Row, Col} from 'react-bootstrap';

import { actionCreators } from '../actions';

import SearchBar from '../components/SearchBar.jsx';

import { sellContainerMainBodyStyle as jsCSS } from '../static/js/style.js';

export default class SellContainerMainBody extends React.Component{
    render(){
        return (
            <div>
                <Row style={jsCSS.mainRow} >
                <Col xs={12}>
                    What concert are you selling tickets for? <br/>
                    <SearchBar />
                </Col>
                </Row>
            </div>
        )
    }
}
