import React from 'react';
import axios from 'axios';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { countriesList: [], countriesData: [], text: '' };
  }

  async componentDidMount() {
    const res = await axios.get('/api/population/');
    const countriesList = res.data.map(({ City }) => City);
    this.setState({ countriesList });
  }

  handleChange = async ({ target: { value } }) => {
    if (value === '') {
      this.setState({ countriesData: [], text: '' });
      return;
    }
    const res = await axios.get('/api/search/', { params: { country: value } });
    this.setState({ countriesData: res.data, text: value });
  }

  renderList() {
    const { countriesData } = this.state;
    return (
      <table className="table">
        <thead>
          <tr>
            <th>City</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
        {countriesData.map(({ City, People }) => (
          <tr key={City}>
            <td>{City}</td>
            <td>{People}</td>
          </tr>
        ))}
        </tbody>
      </table>
    )
  }

  render() {
    const { countriesList, countriesData } = this.state;
    return (
      <div>
      <div className="row py-3">
        <div className="col text-center">
          <p>Please type one of the city from the list<br />
          <b>{countriesList.join(', ')}</b><br />
          in order to get population</p>
        </div>
      </div>
      <div className="row justify-content-center py-3">
        <div className="card" style={{width: '300px', height: '300px'}}>
          <div className="card-body">
            <div className="card-title">
              <form>
                <input type="text" className="form-control" placeholder="Entry Country" onChange={this.handleChange}></input>
              </form>
            </div>
            <div className="card-text">
              {countriesData.length !== 0 && this.renderList()}
            </div>
          </div>
        </div>
      </div>
      </div>  
    );
  }
}