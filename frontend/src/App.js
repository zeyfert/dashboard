

import { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Cv from './components/Cv';
import Tasks from './components/Tasks';
import Modal from './components/Modal';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import TableOmni from './components/OmnicommTable';
import Deviation from './components/OmnicommDeviation';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navigation />
        <div className="container">
          <div className="py-4"> 
            <Switch>
                {/* <Route path="/" component={Dashboard} exact /> */}
                <Route path="/" component={TableOmni} exact />
                <Route path="/deviation" component={Deviation} />
                {/* <Route path="/tasks" component={Tasks} />
                <Route path="/modal" component={Modal} />
                <Route path="/cv" component={Cv} /> */}

            </Switch>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    );
  };
};
