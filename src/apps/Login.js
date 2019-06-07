import React, {Component} from 'react';

/* CSS Files */
import '../css/Login.css';


class LoginApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        }

        // Methods
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
        const url = "http://localhost:5000/auth";
        const postData = {
            'email': this.state.email,
            'password': this.state.password
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
            if (jsonData["status"] === "success") {
                localStorage.setItem("expense-firstName", jsonData["data"]["first_name"]);
                localStorage.setItem("expense-lastName", jsonData["data"]["last_name"]);
                localStorage.setItem("expense-email", jsonData["data"]["email"]);
                localStorage.setItem("expense-budget", jsonData["data"]["budget"]);
                localStorage.setItem("expense-jwt", jsonData["data"]["expense-jwt"]);
                localStorage.setItem("expense-rtk", jsonData["data"]["expense-rtk"]);
                
                // Redirect the user to the dashboard
                window.location.replace('/dashboard');
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        return (
            <div className="login-app">
                <div className="main-container">
                    <h1 id="login-header">Log In</h1>

                    <div id="login-inputs-container">
                        <label className="login-label" htmlFor="email">Email</label>
                        <input value={this.email} onChange={this.changeEvent} type="email" className="input login-input" placeholder="Email" name="email" />
                        <label className="login-label" htmlFor="email">Password</label>
                        <input value={this.password} onChange={this.changeEvent} type="password" className="input login-input" placeholder="Password" name="password" />
                    </div>

                    <button onClick={this.submitData} id="login-submit-btn" className="button is-medium" type="submit">Log In</button>
                </div>
            </div>
        )
    }
}


export default LoginApp;