import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class NavBar extends Component {
    render() {
        return (
            <header>
                <ul id="headerButtons">
                    <li className="navButton"><Link to="">Home</Link></li>
                    <li className="navButton"><Link to="/login">Login</Link></li>
                    <li className="navButton"><Link to="/register">Register</Link></li>
                    <li className="navButton"><Link to="/todolists">To do lists</Link></li>
                </ul>
            </header>
        )
    }
}
export default NavBar;