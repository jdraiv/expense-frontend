
import React, {Component} from 'react';
import '../css/Expenses.css';


import CreateExpenseMenu from './CreateExpenseMenu';


class Expenses extends Component {
    constructor(props) {
        super(props);

        this.state = {
            creatingExpense: true
        }
    }
    render() {
        if (this.state.creatingExpense) {
            return (
                <CreateExpenseMenu />
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
                </div>
            )
        }
    }
}


export default Expenses;