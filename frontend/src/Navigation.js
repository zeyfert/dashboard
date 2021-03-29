import React from 'react';

export default class Navigation extends React.Component {
  render() {
    return (
      <header className="py-3">
      <div className="row flex-nowrap align-items-center">
        <div className="col-4">
          <a className="btn btn-outline-success" href="https://github.com/zeyfert/dashboard">GitHub</a>
        </div>
        <div className="col-4 text-center">
          <a className="text-dark" href="/"><h3>Dashboard</h3></a>
        </div>
        <div className="col-4 d-flex justify-content-end align-items-center ">
          
          <a className="btn btn-outline-secondary" href="/cv">CV</a>
        </div>
      </div>
      </header>
    )
  }
}