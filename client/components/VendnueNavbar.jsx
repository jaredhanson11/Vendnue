import React from 'react';
import { Navbar, Nav, NavItem, FormGroup, FormControl, Button } from 'react-bootstrap';


const centerTextAlignStyle = {textAlign: 'center'}

export default class VendnueNavBar extends React.Component {

    render() {
        return(
            <Navbar style={{marginBottom: '0px'}} fluid inverse >
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href='/'>Vendnue</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>

                <Navbar.Collapse style={centerTextAlignStyle} >
                    <Navbar.Form pullLeft >
                        <FormGroup>
                            <FormControl type='text' placeholder='Search' />
                        </FormGroup>
                        {' '}
                        <Button  bsStyle='primary' type="submit">Submit</Button>
                    </Navbar.Form>
                    <Nav>
                        <NavItem eventKey={1} href='/'>Concerts</NavItem>
                        <NavItem eventKey={2} href='/'>Sellers</NavItem>
                    </Nav>
                    <Nav pullRight >
                        <NavItem eventKey={3} href='/login'>Login</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
