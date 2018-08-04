import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import moment from 'moment';
import CurrentPage from '../components/CurrentPage';
import ForecastPage from '../components/ForecastPage';
import NotFoundPage from '../components/NotFoundPage';
import Footer from '../components/Footer';
import pkg from '../../package.json';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/" component={CurrentPage} exact={true} />
                <Route path="/forecast" component={ForecastPage} />
                <Route component={NotFoundPage} />
            </Switch>
            <div className="container">
                <Footer year={moment().format('YYYY')} version={pkg.version} />
            </div>
        </div>
    </BrowserRouter>
);

export default AppRouter;