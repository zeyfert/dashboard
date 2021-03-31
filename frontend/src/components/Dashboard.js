import React from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataNumber: [],
      heightDiagram: 350,
      dataPopulation: [],
    };
  };

  componentDidMount() {
    axios.get('/api/number')
      .then((res) => {
        this.setState({ dataNumber: res.data })
      });
    axios.get('/api/population')
      .then((res) => {
        this.setState({ dataPopulation: res.data })
      });
  };

  prepareDiagram = (data, groupName, label) => data.reduce((acc, element) => {
    acc.labels.push(element.City);
    acc.datasets[0].data.push(element[groupName]);
    return acc;
  }, {
    labels: [], 
    datasets: [{
      label,
      data: [],
      backgroundColor: "rgba(1,87,155,0.2)",
      borderColor: "rgba(3,169,244,1)",
      hoverBackgroundColor: "rgba(3,169,244,0.4)",
      hoverBorderColor: "rgba(3,169,244,1)",
      borderWidth: 2,
  }]});

  preparePieDiagram = (data, groupName, label) => data.reduce((acc, element) => {
    acc.labels.push(element.City);
    acc.datasets[0].data.push(element[groupName]);
    return acc;
  }, {
    labels: [], 
    datasets: [{
      label,
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 130, 210, 0.2)',
      ],
      borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 130, 210, 1)',
      ],
      borderWidth: 1,
  }]});

  render() {
    const { dataNumber, heightDiagram, dataPopulation } = this.state;
    return (
      <div>
        <div className="row pb-4">
          <div className="col-lg-4">
            <div className="card h-400">
              <div className="card-body">
                <Pie
                  data={this.preparePieDiagram(dataPopulation, 'People','Численность')}
                  height={heightDiagram}
                  options={{
                    maintainAspectRatio: false,
                    title: {
                      display: true,
                      text: 'Население',
                      position: 'bottom',
                    } 
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card h-400">
              <div className="card-body">
                <Bar
                  data={this.prepareDiagram(dataNumber, 'WebStudies', 'Количество Web-студий')}
                  height={heightDiagram}
                  options={{
                    maintainAspectRatio: false
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row pb-4">
          <div className="col-lg-6">
            <div className="card h-400">
              <div className="card-body">
              <Bar
                  data={this.prepareDiagram(dataNumber, 'Hosting' ,'Количество хостингов')}
                  height={heightDiagram}
                  options={{
                    maintainAspectRatio: false
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card h-400">
              <div className="card-body">
                <Bar
                  data={this.prepareDiagram(dataNumber, 'University', 'Количество университетов')}
                  height={heightDiagram}
                  options={{
                    maintainAspectRatio: false
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

  
