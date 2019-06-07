import React, {Component} from 'react';

/* Child Components */
import Navbar from '../components/Navbar';
import DailyStats from '../components/DailyStats';
import Expenses from '../components/Expenses';

/* CSS Files */
import '../css/Dashboard.css';
import { throwStatement } from '@babel/types';


class DashboardApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            budget: 0,
            firstName: "",
            lastName: "",
            expenses: [],
            authorizationKeys: {},
        }

        // Methods
        this.fetchExpenses = this.fetchExpenses.bind(this);
        this.updateTokens = this.updateTokens.bind(this);
    }

    fetchExpenses() {
        // Fetching data
        const url = "http://localhost:5000/get_expenses";
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': JSON.stringify(this.state.authorizationKeys)
            }
        })
        .then((response) => {
            return response.json()
        })
        .then((jsonData) => {
            if (jsonData["status"] === "success") {
                this.setState({
                    expenses: jsonData['data']
                });
                console.log("Expenses have been set")
            } else if (jsonData["status"] === "refresh") {
                this.updateTokens(jsonData["data"]["expense-jwt"], jsonData["data"]["expense-rtk"]);
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    setInitialData() {
        // We set the data from localStorage
        this.setState({
            email: localStorage.getItem("expense-email"),
            firstName: localStorage.getItem("expense-firstName"),
            lastName: localStorage.getItem("expense-lastName"),
            budget: localStorage.getItem("expense-budget"),
            authorizationKeys: {"expense-jwt" : localStorage.getItem("expense-jwt"), "expense-rtk": localStorage.getItem("expense-rtk")}
        }, () => {
            this.fetchExpenses();
        });
    }

    updateTokens(newJWT, newRTK) {
        // Store the new tokens in state and localStorage
        this.setState({
            authorizationKeys: {"expense-jwt": newJWT, "expense-rtk": newRTK}
        });

        localStorage.setItem("expense-jwt", newJWT);
        localStorage.setItem("expense-rtk", newRTK);
        console.log("Tokens updated");
    }

    componentDidMount() {
        this.setInitialData();
    }

    render() {
        return (
            <div className="dashboard-app">
                <Navbar firstName={this.state.firstName} lastName={this.state.lastName} />

                <div className="components-container">
                    <DailyStats />
                    <Expenses expenses={this.state.expenses} budget={this.state.budget} authorizationKeys={this.state.authorizationKeys} updateTokensMethod={this.updateTokens} />
                </div>

            </div>
        )
    }
}

export default DashboardApp;

