
import React, {Component} from 'react';
import '../css/Expenses.css';


import CreateExpenseMenu from './CreateExpenseMenu';


class ExpenseTableItem extends Component {
    // Props = color, category, total, payee, date
    constructor(props) {
        super(props);
    }
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
            return <ExpenseTableItem color={expense['color']} category={expense['category']} payee={expense['payee']} total={expense['total']} date={expense['expenseDate']} />
        });
        if (this.state.creatingExpense) {
            return (
                <CreateExpenseMenu authorizationKeys={this.props.authorizationKeys} updateTokensMethod={this.props.updateTokensMethod} successFunction={this.expenseSuccessfullyCreated} closeMenuMethod={this.showOrHideMenu} />
            )
        }
        else {
            return (
                <div className="expenses-section">
                    <div className="budget-container">
                        <h2 id="budget-value">Budget: ${this.props.budget}</h2>
                    </div>

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