import React from 'react';
import Bulma from 'bulma/css/bulma.min.css';

import '../css/Navbar.css'


function Navbar(props) {
    return (
        <nav className="dashboard-navbar">
            <div className="navbar-menu">
                <a id="navbar-analytics-btn" class="button">Analytics</a>

                <button id="navbar-name-btn" className="button">{props.firstName} {props.lastName}</button>
                <button id="navbar-logout-btn" className="button">Sign Out</button>
            </div>
        </nav>
    )
}

export default Navbar;