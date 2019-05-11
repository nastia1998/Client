import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
}
    from 'reactstrap';

class NavBar extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            /*<header>
                <ul id="headerButtons">
                    <li className="navButton"><Link to="">Home</Link></li>
                    <li className="navButton"><Link to="/login">Login</Link></li>
                    <li className="navButton"><Link to="/register">Register</Link></li>
                    <li className="navButton"><Link to="/todolists">To do lists</Link></li>
                </ul>
            </header>*/
            <header>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">To do list</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/login">Login</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/register">Register</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/todolists">To do lists</NavLink>
                            </NavItem>
                        </Nav>
                </Navbar>
            </header>
        )
    }
}
export default NavBar;