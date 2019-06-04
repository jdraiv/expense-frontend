import React, {Component} from 'react';

/* CSS Files */
import '../css/Register.css';


class RegisterApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        };

        this.changeEvent = this.changeEvent.bind(this);
        this.submitData = this.submitData.bind(this);
    }

    changeEvent(event) {
        let name = event.target.name;

        this.setState({
            [name]: event.target.value
        });
    }

    submitData(event) {
        const url = "http://localhost:5000/register";
        const postData = {
            'email': this.state.email,
            'password': this.state.password,
            'first_name': this.state.firstName,
            'last_name': this.state.lastName
        }

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.json()
        }).then((jsonData) => {
            console.log(jsonData);
            if (jsonData["status"] === "success") {
                // Redirect to login
                window.location.replace("/login");
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        return (
            <div className="register-app">
                <div className="main-container">
                    <div className="left-box">
                    </div>
                    <div className="right-box">
                        <h3 className="register-header">Create your account</h3>

                        <label htmlFor="firstName" className="register-label">First Name</label>
                        <input value={this.firstName} onChange={this.changeEvent} name="firstName" type="text" className="input register-input" placeholder="First Name"/>

                        <label htmlFor="lastName" className="register-label">Last Name</label>
                        <input value={this.lastName} onChange={this.changeEvent} name="lastName" type="text" className="input register-input" placeholder="Last Name"/>

                        <label htmlFor="email" className="register-label">Email</label>
                        <input value={this.email} onChange={this.changeEvent} name="email" type="email" className="input register-input" placeholder="Email"/>

                        <label htmlFor="password" className="register-label">Password</label>
                        <input value={this.password} onChange={this.changeEvent} name="password" type="password" className="input register-input" placeholder="Password" />

                        <button onClick={this.submitData} id="register-submit-btn" className="button is-medium" type="submit">Create Account</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegisterApp;