import React, {Component} from 'react';
import charactersImage from '../characters.jpg';

/* CSS Files */
import '../css/Register.css';


class RegisterApp extends Component {
    render() {
        return (
            <div className="register-app">
                <div class="main-container">
                    <div className="left-box">
                    </div>
                    <div className="right-box">
                        <h3 className="register-header">Create your account</h3>
                        <label className="register-label">First Name</label>
                        <input type="text" className="input register-input" placeholder="First Name"/>
                        <label className="register-label">Last Name</label>
                        <input type="text" class="input register-input" placeholder="Last Name"/>
                        <label className="register-label">Email</label>
                        <input type="email" className="input register-input" placeholder="Email"/>
                        <label className="register-label">Password</label>
                        <input type="password" className="input register-input" placeholder="Password" />

                        <button id="register-submit-btn" className="button is-medium" type="submit">Create Account</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegisterApp;