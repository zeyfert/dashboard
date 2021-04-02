

import { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Cv from './components/Cv';
import Tasks from './components/Tasks';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navigation />
        <div className="container h-100">
          <div className="py-4 h-100"> 
            <Switch>
                <Route path="/" component={Dashboard} exact />
                <Route path="/tasks" component={Tasks} />
                <Route path="/cv" component={Cv} />
            </Switch>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    );
  };
};
