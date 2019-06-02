import React from 'react';
import Bulma from 'bulma/css/bulma.min.css';


function Navbar(props) {
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-menu">
                <div className="navbar-end">
                    <div className="navbar-item">
                        <a href="#">Analytics</a>
                        <a>{props.firstName} {props.lastName}</a>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;