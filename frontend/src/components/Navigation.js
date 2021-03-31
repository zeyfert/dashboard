import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../images/logo.svg';


export default class Navigation extends React.Component {
  render() {
    return (
            <nav className="navbar rounded border-bottom shadow">
              <a className="navbar-brand" href="http://dashboard-template.ru/">
                <img src={logo} style={{ height: 40 }} alt="logo" />
              </a>
              <ul className="nav mr-auto">
                <li className="nav-link">
                  <NavLink exact to="/">Dashboard</NavLink>
                </li>
                {/* <li className="nav-link">
                  <NavLink to="/sliders">Sliders</NavLink>
                </li>
                <li className="nav-link">
                  <NavLink to="/tables">Tables</NavLink>
                </li> */}
                <li className="nav-link">
                  <NavLink to="/cv">CV</NavLink>
                </li>
              </ul>
              <a  className="btn btn-outline-success navbar-toogler-right" href="https://github.com/zeyfert/dashboard">GitHub</a>
            </nav>
    );
  };
};