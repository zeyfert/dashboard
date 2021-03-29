
import './App.css';
import { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import Cv from './Cv';
import Navigation from './Navigation';

export default class App extends Component {
  render() {
    return (

      <div className="container">
        <Navigation />
      <BrowserRouter>
        
          <Switch>
            <Route path="/" component={Dashboard} exact />
            <Route path="/cv" component={Cv}  />
          </Switch>
       
      </BrowserRouter>
      </div>
      // </div>
    )
  }
}
