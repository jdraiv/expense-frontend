import React, {Component} from 'react';
import Bulma from 'bulma/css/bulma.min.css';

import '../css/Navbar.css';


class Navbar extends Component {
    // signoutMethod
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="dashboard-navbar">
                <button id="navbar-name-btn" className="button">{this.props.firstName} {this.props.lastName}</button>
                <button onClick={this.props.signoutMethod} id="navbar-logout-btn" className="button">Sign Out</button>
            </nav>
        )
    }
}


export default Navbar;