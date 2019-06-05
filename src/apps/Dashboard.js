import React, {Component} from 'react';

/* Child Components */
import Navbar from '../components/Navbar';
import DailyStats from '../components/DailyStats';
import Expenses from '../components/Expenses';

/* CSS Files */
import '../css/Dashboard.css';


class DashboardApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            budget: 0,
            firstName: "",
            lastName: "",
            expenses: []
        }

        // Methods
        this.setDataFromLocalStorage = this.setDataFromLocalStorage.bind(this);
        this.fetchExpenses = this.fetchExpenses.bind(this);
        this.updateTokens = this.updateTokens.bind(this);
    }


    setDataFromLocalStorage() {
        this.setState({
            email: localStorage.getItem("expense-email"),
            firstName: localStorage.getItem("expense-firstName"),
            lastName: localStorage.getItem("expense-lastName"),
            budget: localStorage.getItem("expense-budget")
        });

        console.log(this.state.firstName)
    }


    fetchExpenses() {
        // Fetching data
        const url = "https://expense-challenge.herokuapp.com/get_expenses";
        let authorizationData = {
            "expense-jwt": localStorage.getItem("expense-jwt"), 
            "expense-rtk": localStorage.getItem("expense-rtk")
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': JSON.stringify(authorizationData)
            }
        })
        .then((response) => {
            return response.json()
        })
        .then((jsonData) => {
            if (jsonData["status"] === "success") {
                this.expenses = jsonData['data']['expenses'];
                console.log("Expenses have been set")
            } else if (jsonData["status"] === "refresh") {
                this.updateTokens(jsonData["data"]["expense-jwt"], jsonData["data"]["expense-rtk"]);
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }


    updateTokens(newJWT, newRTK) {
        localStorage.setItem("expense-jwt", newJWT);
        localStorage.setItem("expense-rtk", newRTK);

        console.log("Tokens updated");
    }


    componentDidMount() {
        this.setDataFromLocalStorage();
        this.fetchExpenses();
    }

    render() {
        return (
            <div className="dashboard-app">
                <Navbar firstName={this.state.firstName} lastName={this.state.lastName} />

                <div class="components-container">
                    <DailyStats />
                    <Expenses />
                </div>

            </div>
        )
    }
}

export default DashboardApp;

