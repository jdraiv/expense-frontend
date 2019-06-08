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
            expenses: [],
            authorizationKeys: {},
        }

        // Methods
        this.fetchExpenses = this.fetchExpenses.bind(this);
        this.updateTokens = this.updateTokens.bind(this);
        this.getChildResponse = this.getChildResponse.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
    }

    // Tricky way to receive information from child elements
    getChildResponse(stateElement, newValue, eventType) {
        if (eventType === "addBudget") {
            this.setState({
                [stateElement]: newValue
            });
        }
        else if (eventType === "subBudget") {
            let url = "https://expense-challenge.herokuapp.com/update_budget";

            fetch(url, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': JSON.stringify(this.state.authorizationKeys)
                },
                body: JSON.stringify({"budget": this.state.budget - newValue})
            })
            .then((response) => {
                return response.json()
            }).then((jsonData) => {
                if (jsonData["status"] === "success") {
                    this.setState({
                        budget: this.state.budget - newValue
                    });
                    localStorage.setItem("budget", this.state.budget - newValue);
                }
            })
        }
        else if (eventType === "addExpense") {
            this.setState(prevState => ({
                expenses: this.state.expenses.concat(newValue)
            }))
        }
    }

    fetchExpenses() {
        // Fetching data
        const url = "https://expense-challenge.herokuapp.com/get_expenses";
        
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
                this.fetchExpenses();
            }
            else {
                // If there has been an error, the user cannot access this page
                localStorage.removeItem("expense-jwt");
                localStorage.removeItem("expense-rtk");
                localStorage.removeItem("expense-email");
                localStorage.removeItem("expense-budget");
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    logoutUser() {
        localStorage.removeItem("expense-jwt");
        localStorage.removeItem("expense-rtk");
        localStorage.removeItem("expense-firstName");
        localStorage.removeItem("expense-lastName");
        localStorage.removeItem("expense-email");
        localStorage.removeItem("expense-budget");

        window.location.replace('/login');
    }

    setInitialData() {
        // We set the data from localStorage
        if (localStorage.getItem("expense-jwt") === null) {
            this.logoutUser();
        }
        else {
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
                <Navbar signoutMethod={this.logoutUser} firstName={this.state.firstName} lastName={this.state.lastName} />

                <div className="components-container">
                    <DailyStats expenses={this.state.expenses} />
                    <Expenses expenses={this.state.expenses} budget={this.state.budget} authorizationKeys={this.state.authorizationKeys} updateTokensMethod={this.updateTokens} passDataToParentMethod={this.getChildResponse} />
                </div>

            </div>
        )
    }
}

export default DashboardApp;

