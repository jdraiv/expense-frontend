
import React, {Component} from 'react';
import '../css/Expenses.css';


import CreateExpenseMenu from './CreateExpenseMenu';


class BudgetContainer extends Component {
    // Props = authorizationKeys, budget, passDataToParentMethod
    constructor(props) {
        super(props);

        this.state = {
            currentBudget: 0
        }

        this.inputChange = this.inputChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.setBudget = this.setBudget.bind(this);
    }

    inputChange(event) {
        let toSetValue = event.target.value;
        if (event.target.value.length === 0) {
            toSetValue = 0;
        }

        this.setState({
            currentBudget: parseInt(toSetValue, 10)
        });
    }


    handleKeyDown(event) {
        if (event.key === 'Enter') {
            this.setBudget();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.currentBudget !== nextProps) {
            this.setState({
                currentBudget: nextProps.budget
            });
        }
    }

    setBudget() {
        const url = "https://expense-challenge.herokuapp.com/update_budget";
        fetch(url, {
            method: "PUT",
            body: JSON.stringify({"budget": this.state.currentBudget}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': JSON.stringify(this.props.authorizationKeys)
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((jsonData) => {
            if (jsonData["status"] === "success") {
                // Notify the parent of the new value
                this.props.passDataToParentMethod("budget", this.state.currentBudget, "addBudget");

                // Overwrite data in localStorage
                localStorage.setItem("expense-budget", this.state.currentBudget);
            }
        });
    }

    render() {
        return (
            <div className="budget-container">
                <h3 className="budget-header">Budget $</h3>
                <input className="budget-value" onChange={this.inputChange} value={this.state.currentBudget} onKeyDown={this.handleKeyDown} />
            </div>
        )
    }
}


class ExpenseTableItem extends Component {
    // Props = color, category, total, payee, date
    render() {
        let color = {"backgroundColor": this.props.color};
        return (
            <tr>
                <td className="table-category"><button className="table-category-btn" style={color}>{this.props.category}</button></td>
                <td className="table-payee">{this.props.payee}</td>
                <td className="table-total">${this.props.total}</td>
                <td className="table-date">{this.props.date}</td>
            </tr>
        )
    }
}


class Expenses extends Component {
    // Props = expenses, authorizationKeys, updateTokensMethod
    constructor(props) {
        super(props);

        this.state = {
            creatingExpense: false
        }

        this.expenseSuccessfullyCreated = this.expenseSuccessfullyCreated.bind(this);
        this.showOrHideMenu = this.showOrHideMenu.bind(this);
    }

    expenseSuccessfullyCreated() {
        this.setState({
            creatingExpense: false
        });
    }

    showOrHideMenu() {
        this.setState({
            creatingExpense: !this.state.creatingExpense
        });
    }

    render() {
        let expenses = this.props.expenses.map((expense, key) => {
            return <ExpenseTableItem key={expense['id']} color={expense['color']} category={expense['category']} payee={expense['payee']} total={expense['total']} date={expense['expenseDate']} />
        });
        if (this.state.creatingExpense) {
            return (
                <CreateExpenseMenu authorizationKeys={this.props.authorizationKeys} updateTokensMethod={this.props.updateTokensMethod} successFunction={this.expenseSuccessfullyCreated} closeMenuMethod={this.showOrHideMenu} passDataToParentMethod={this.props.passDataToParentMethod} />
            )
        }
        else {
            return (
                <div className="expenses-section">
                    <BudgetContainer budget={this.props.budget} authorizationKeys={this.props.authorizationKeys} passDataToParentMethod={this.props.passDataToParentMethod} />
                    <div className="expenses-table-container">
                        <table className="table expenses-table">
                            <tr className="tbody">
                                <th>Category</th>
                                <th>Payee</th>
                                <th>Total</th>
                                <th>Date</th>
                            </tr>
                            {expenses}
                        </table>
                    </div>

                    <div id="create-expense-submit-btn" className="button" onClick={this.showOrHideMenu}>Create Expense</div>
                </div>
            )
        }
    }
}


export default Expenses;