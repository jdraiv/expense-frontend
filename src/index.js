import React from 'react';
import ReactDOM from 'react-dom';

/* Importing apps */
import LoginApp from './apps/Login';
import DashboardApp from './apps/Dashboard';

import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';


const appRouter = (
    <Router>
        <div>
            <Route path="/login" component={LoginApp} />
            <Route path="/dashboard" component={DashboardApp} />
        </div>
    </Router>
)

ReactDOM.render(appRouter, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
