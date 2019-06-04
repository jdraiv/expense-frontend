import React, {Component} from 'react';

/* Child Components */
import Navbar from '../components/Navbar';

/* CSS Files */
import '../css/Dashboard.css';


class DashboardApp extends Component {

    componentDidMount() {
        // Fetching data
        const url = "http://localhost:5000/get_expenses";

        fetch(url, {
            method: 'POST',
            credentials: 'include'
        })
        .then((response) => {
            return response.json()
        })
        .then((jsonData) => {
            console.log(jsonData);
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        return (
            <div className="dashboard-app">
                <Navbar />

                <h1>Hello</h1>
            </div>
        )
    }
}

export default DashboardApp;

