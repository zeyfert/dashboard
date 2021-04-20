import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Line } from 'react-chartjs-2';


export default class Diagram extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hourlyData: [], dailyData: [] };
  }

  componentDidMount() {
    axios.get('/api/bitcoin/hourly')
      .then((res) => {
        const { data } = res;
        const formatedData = data.map(({ time, close }) => {
          const humanReadableTime = moment.unix(time).format('HH:mm:ss');
          return { time: humanReadableTime, close };
        })
        this.setState({ hourlyData: formatedData });
    });
    axios.get('/api/bitcoin/daily')
      .then((res) => {
        const { data } = res;
        const formatedData = data.map(({ time, close }) => {
          const humanReadableTime = moment.unix(time).format('DD.MM');
          return { time: humanReadableTime, close };
        })
        this.setState({ dailyData: formatedData });
    });
  };

  prepareDiagram(data, label) { 
    const diagram = data.reduce((acc, element) => {
      acc.labels.push(element.time);
      acc.datasets[0].data.push(element.close);
      return acc;
    }, {
      labels: [], 
      datasets: [
        {
          label,
          data: [],
          backgroundColor: "rgba(1,87,155,0.2)",
          borderColor: "rgba(3,169,244,1)",
          hoverBackgroundColor: "rgba(3,169,244,0.4)",
          hoverBorderColor: "rgba(3,169,244,1)",
          borderWidth: 2,
        },
      ],
    });
    return diagram;
  };

  render() {
    const { hourlyData, dailyData } = this.state;
    const date = moment().format('DD.MM.YYYY');
    return (
      <div>
        <div className="row">
          <div className="col-12">
            <Line
              data={this.prepareDiagram(dailyData, `Динамика стоимости Bitcoin за 7 дней`)}
              options={{
                responsive: true,
              }}
            />
          </div>
        </div>
        <div className="row py-5">
          <div className="col-12">
            <Line
              data={this.prepareDiagram(hourlyData, `Стоимость Bitcoin на ${date}`)}
              options={{
                responsive: true,
              }}
            />
          </div>
        </div>
      </div>
    )
  }
};