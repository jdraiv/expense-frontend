import React, {Component} from 'react';
import '../css/Homepage.css';


class HomepageApp extends Component {
    render() {
        return (
            <div className="homepage-container">
                <div className="auth-btns-container">
                    <a id="dashboard-login-btn" className="button" href="/login">Log In</a>
                    <a id="dashboard-register-btn" className="button" href="/register">Register</a>
                </div>
            </div>
        )
    }

}


export default HomepageApp;