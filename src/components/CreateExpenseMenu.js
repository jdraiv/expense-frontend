
import React, {Component} from 'react';

import '../css/CreateExpenseMenu.css';
import { EventEmitter } from 'events';


class CreateExpenseMenu extends Component {
    // authorizationKeys, updateTokensMethod, successFunction, closeMenuMethod
    constructor(props) {
        super(props);
        this.state = {
            categories: [
                {'name': 'gas', 'color': '#5fd8b9'},
                {'name': 'clothing', 'color': '#69698C'},
                {'name': 'food', 'color': '#F44E6A'},
                {'name': 'health', 'color': '#FC8FB4'},
                {'name': 'house', 'color': '#57D68A'},
                {'name': 'going out', 'color': '#B09EE5'}
            ],
            category: "",
            color: "",
            date: "",
            total: "",
            payee: ""
        }

        this.selectCategory = this.selectCategory.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitData = this.submitData.bind(this);
    }

    selectCategory(event, categoryData) {
        this.setState({
            category: categoryData['name'],
            color: categoryData['color']
        });
    }

    handleInputChange(event) {
        let name = event.target.name
        this.setState({
            [name]: event.target.value
        });
    }

    submitData() {
        let url = "http://localhost:5000/create_expense";
        let postData = {
            "category": this.state.category,
            "color": this.state.color,
            "date": this.state.date,
            "total": parseInt(this.state.total, 10),
            "payee": this.state.payee
        }

        // Send information to the API
        fetch(url, {
            method: "POST",
            body: JSON.stringify(postData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': JSON.stringify(this.props.authorizationKeys)
            },
        }).then((response) => {
            return response.json();
        }).then((jsonData) => {
            if (jsonData["status"] === "success") {
                this.props.successFunction();
            }
            else if (jsonData["status"] === "refresh") {
                this.props.updateTokensMethod(jsonData["data"]["expense-jwt"], jsonData["data"]["expense-rtk"]);
                this.submitData();
            }
        });
    }

    render() {
        const categories = this.state.categories.map((category) => {
            let style = {"backgroundColor": category['color']};
            return <button onClick={(event) => this.selectCategory(event, category)} className="button category-btn" id={category['name']} style={style}>{category['name']}</button>
        })
        return (
            <div className="modal is-active">
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="create-expense-menu-container">
                        <h1 className="header">New Expense</h1>
                        
                        <h3 id="category-header">Category: <span id="active-category">{this.state.category}</span></h3>
                        <div className="categories-container">
                            {categories}
                        </div>

                        <div className="inputs-container">
                            <label className="create-expense-menu-label">Date</label>
                            <input value={this.state.date} onChange={this.handleInputChange} name="date" className="input create-expense-menu-input" type="date" />

                            <label className="create-expense-menu-label">Total</label>
                            <input value={this.state.total} onChange={this.handleInputChange} name="total" className="input create-expense-menu-input" placeholder="Total" />

                            <label className="create-expense-menu-label">Payee</label>
                            <input value={this.state.payee} onChange={this.handleInputChange} name="payee" className="input create-expense-menu-input" placeholder="Total" />
                        </div>

                        <button onClick={this.submitData} type="button" className="button is-medium submit-btn">Create Expense</button>
                        <button onClick={this.props.closeMenuMethod} className="modal-close is-large" aria-label="close"></button>
                    </div>
                </div>
            </div>
        )
    }
}


export default CreateExpenseMenu;