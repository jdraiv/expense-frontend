import React from 'react';
import Bulma from 'bulma/css/bulma.min.css';

import '../css/Navbar.css'


function Navbar(props) {
    return (
        <nav className="dashboard-navbar">
            <div className="navbar-menu">
                <a href="#">Analytics</a>
                <a>{props.firstName} {props.lastName}</a>
            </div>
        </nav>
    )
}

export default Navbar;