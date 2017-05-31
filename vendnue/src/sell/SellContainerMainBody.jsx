import React from 'react';
import Immutable from 'immutable';

import {Row, Col} from 'react-bootstrap';

import { actionCreators } from '../actions';

import { concertContainerMainBodyStyle as jsCSS } from '../static/js/style.js';

export default class SellContainerMainBody extends React.Component{
    render(){
        return (
            <div>
                <Row style={jsCSS.mainRow} >
                    Hey
                </Row>
            </div>
        )
    }
}
