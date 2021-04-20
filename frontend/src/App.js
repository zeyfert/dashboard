

import { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Tasks from './components/Tasks';
import Modal from './components/Modal';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Diagram from './components/Diagram';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navigation />
        <div className="container">
          <div className="py-4"> 
            <Switch>
                <Route path="/" component={Diagram} exact />
                <Route path="/stat" component={Dashboard} />
                <Route path="/tasks" component={Tasks} />
                <Route path="/modal" component={Modal} />
            </Switch>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    );
  };
};
