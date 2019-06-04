import React from 'react';
import ReactDOM from 'react-dom';

/* Global CSS  */
import './css/Vars.css';
import 'bulma/css/bulma.css';
import './css/Style.css';

/* Importing apps */
import RegisterApp from './apps/Register';
import LoginApp from './apps/Login';
import DashboardApp from './apps/Dashboard';

import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';


const appRouter = (
    <Router>
        <Route path="/register" component={RegisterApp} />
        <Route path="/login" component={LoginApp} />
        <Route path="/dashboard" component={DashboardApp} />
    </Router>
)

ReactDOM.render(appRouter, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
