import React from 'react';
import axios from 'axios';

class Tr extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let textColor;
    let { value } = this.props;
    if (value === null) {
      textColor = 'text-danger'
      value = 'Нет данных'
    }
    if (value <= 0) {
      textColor = 'text-primary';
    } else if (value >= 15) {
      textColor = 'text-warning';
    }
    return (
      <td className={textColor}>{value}</td>
    )
  }
}

class TableOmni extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: [], isLoading: true };
  }

  async componentDidMount() {
    const data = await axios.get('/api/temperature-report');
    this.setState({ data: data.data, isLoading: false })
  }

  renderTbody = (data) => {
    const rows = data.map(({ vehicleName, geozoneName, startDate, endDate, duration, tempIn, tempOut }) => {
      
      return (
      <tr>
        <td className="width: 25%">{vehicleName}</td>
        <td className="width: 50%">{geozoneName}</td>
        <td>{startDate}</td>
        <td>{endDate}</td>
        <td>{duration}</td>
        <Tr value={tempIn} />
        <Tr value={tempOut} />

      </tr>
      )
    })
    return rows
  }

  render() {
    const { data, isLoading } = this.state
    const preparedData = data.map(({
      vehicleName, geozoneName, startDate, endDate, duration, tempIn, tempOut
    }) => { 
      let startTime;
      const endTime = new Date(endDate *1000)
      if (startDate === 0) {
        const date = new Date()

        const [ month, day, year ] = date.toLocaleDateString().split('/');
        startTime = new Date(year, month, day, 0, 0, 0)
      }
       startTime = new Date(startDate *1000);
        
      const dur = new Date(duration *1000)
      const st = startTime.toLocaleTimeString();
      const et = endTime.toLocaleTimeString()
      const dr = dur.toLocaleTimeString();
      return { vehicleName, geozoneName, startDate: st, endDate: et, duration: dr, tempIn: Math.round(tempIn), tempOut: Math.round(tempOut) }
          
      }
    )
    if (isLoading) {
      return (
        <div>Загрузка данных. Пожалуйста, подождите</div>
      )
    }
    return (
      <div>
        <table className="table table-striped table-hover table-sm">
          <thead className="thead-light">
            <tr>
              <th>Т/С</th>
              <th>Геозона</th>
              <th>Время входа в геозону</th>
              <th>Время выхода из геозоны</th>
              <th>Длительность пребывания</th>
              <th>Температура при входе</th>
              <th>Температура при выходе</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTbody(preparedData)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default TableOmni;