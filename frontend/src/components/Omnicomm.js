import React, { Suspense } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';

export default class Omnicomm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { jwtKey: '', vehiclesList: [], stat: [], heightDiagram: 350, isReady: false };
  }
  
  async componentDidMount() {
    const login = await axios.post('https://online.omnicomm.ru/auth/login?jwt=1', {
      login: 'rudemoru',
      password: 'rudemo123456',
    });
    await this.setState({ jwtKey: login.data.jwt });
    const vehiclesList = await axios.get('https://online.omnicomm.ru/ls/api/v1/tree/vehicle', {
      headers: {
        Authorization: `JWT ${login.data.jwt}`,
      }
    })
    const formatedList = await vehiclesList.data.objects.map(({ name, terminal_id }) => ({ name, terminal_id }))
    this.setState({ vehiclesList: formatedList})
    const preparedList = formatedList.map(({ terminal_id }) => terminal_id).join(',')
    const res = await axios.get(`https://online.omnicomm.ru/ls/api/v1/reports/statistics`, {
      headers: {
        Authorization: `JWT ${login.data.jwt}`,
      },
      params: {
        timeBegin: 1617292718,
        timeEnd: 1617638318,
        dataGroups: '[mw,fuel]',
        vehicles: `[${preparedList}]`
      }
    })

    const prepareData = await res.data.data.vehicleDataList.map(({
      name,
      fuel: { fuelConsumption },
      mw: { maxSpeed }
    }) => ({ name, fuelConsumption, maxSpeed }))
    this.setState({ stat: prepareData })
  };

  // getCarStat = async () => {
  //   const { jwtKey } = this.state;
  //   const id = 'cae6903c-c384-3099-86ea-3f398ca91f59';
  //   const res = await axios.get(`https://online.omnicomm.ru/ls/api/v1/reports/track/${id}`, {
  //     headers: {
  //       Authorization: `JWT ${jwtKey}`,
  //     },
  //     params: {
  //       timeBegin: 1617275105,
  //       timeEnd: 1617707105,
  //     }
  //   })
  //   console.log(res)
  // }

  // getStatistics = async () => {

  //   const { jwtKey, vehiclesList } = this.state;
  //   const preparedList = vehiclesList.map(({ terminal_id }) => terminal_id).join(',')
  //   console.log(preparedList)
  //   const res = await axios.get(`https://online.omnicomm.ru/ls/api/v1/reports/statistics`, {
  //     headers: {
  //       Authorization: `JWT ${jwtKey}`,
  //     },
  //     params: {
  //       timeBegin: 1617292718,
  //       timeEnd: 1617638318,
  //       dataGroups: '[mw,fuel]',
  //       vehicles: `[${preparedList}]`
  //     }
  //   })

  //   const prepareData = res.data.data.vehicleDataList.map(({
  //     name,
  //     fuel: { fuelConsumption },
  //     mw: { maxSpeed }
  //   }) => ({ name, fuelConsumption, maxSpeed }))
  //   console.log(prepareData)
  // }

  prepareDiagram = (data, groupName, label) => data.reduce((acc, element) => {
    acc.labels.push(element.name);
    acc.datasets[0].data.push(element[groupName]);
    console.log(acc)
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
  
  render() {
    const { stat, heightDiagram } = this.state
    console.log(stat)
      return (
        <div>
          {/* <button className="btn btn-outline-primary" onClick={this.handleClick}>Get Key</button>
          <button className="btn btn-outline-success" onClick={this.handleGetData}>GetList</button>
          <button className="btn btn-outline-danger" onClick={this.getCarStat}>GetList</button>
          <button className="btn btn-outline-danger" onClick={this.getStatistics}>GetList</button> */}
           <div className="row pb-4">
          <div className="col-lg-6">
            <div className="card h-400">
              <div className="card-body">
                <Suspense fallback={<h1>Loading posts...</h1>}>
              <Bar
                  data={this.prepareDiagram(stat, 'fuelConsumption' ,'Потребление топлива')}
                  height={heightDiagram}
                  options={{
                    maintainAspectRatio: false
                  }}
                />
                </Suspense>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card h-400">
              <div className="card-body">
                <Bar
                  data={this.prepareDiagram(stat, 'maxSpeed', 'Максимальная скорость')}
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
      )
    }
}