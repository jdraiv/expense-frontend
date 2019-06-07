
import React, {Component} from 'react';
import '../css/Expenses.css';


import CreateExpenseMenu from './CreateExpenseMenu';


class Expenses extends Component {
    // Props = authorizationKeys, updateTokensMethod
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
        if (this.state.creatingExpense) {
            return (
                <CreateExpenseMenu authorizationKeys={this.props.authorizationKeys} updateTokensMethod={this.props.updateTokensMethod} successFunction={this.expenseSuccessfullyCreated} closeMenuMethod={this.showOrHideMenu} />
            )
        }
        else {
            return (
                <div className="expenses-container">
                    <div className="budget-container">
                        <h2 id="budget-value">Budget: {this.props.budget}</h2>
                    </div>

                    <div className="expenses-container">
                        <table>
                            <tr>
                                <th>Category</th>
                                <th>Payee</th>
                                <th>Total</th>
                                <th>Date</th>
                            </tr>
                        </table>
                    </div>

                    <div className="button" onClick={this.showOrHideMenu}>Create Expense</div>
                </div>
            )
        }
    }
}


export default Expenses;