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
        const url = "localhost:5000/auth";
        const postData = {
            'email': this.state.email,
            'password': this.state.password
        }
        console.log('hai')

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log(response);
            return response.json()
        }).then((jsonData) => {
            console.log(jsonData);

            /*
            if (jsonData["status"] === "success") {
                window.location.replace('/dashboard');
            }
            */
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