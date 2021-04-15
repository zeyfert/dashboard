const express = require('express');
const mongoose = require('mongoose');
let { port } = require('./variables');
const fetch = require('node-fetch');
const cors = require('cors')

port = 3001
const app = express();

// app.use(cors());

// const statisticsScheme = mongoose.Schema(
//   { City: String, WebStudies: Number, Hosting: Number, University: Number},
//   { collection: 'data' }
// );

// const peopleScheme = mongoose.Schema(
//   { City: String, People: Number},
//   { collection: 'number' }
// );

// const statisticsModel = mongoose.model('data', statisticsScheme);

// const statisticsModelPeople = mongoose.model('number', peopleScheme);

app.get('/api/number', (req, res) => {
  statisticsModel.find({}, (err, data) => {
    if (err) { return console.log(err) }
    res.send(data);
  });
});

app.get('/api/population', (req, res) => {
  statisticsModelPeople.find({}, (err, data) => {
    if (err) { return console.log(err) }
    res.send(data);
  });
});

app.get('/api/temperature-report', (req, res) => {
  let login = async () => {
    const result = await fetch('https://online.omnicomm.ru/auth/login?jwt=1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: 'atktest',
        password: 'atktest1',
      }),
    });
    const jsonResult = await result.json();
    return jsonResult.jwt;
  };
  
  let getData = async (jwt, timeBegin, timeEnd, vehicleIds) => {
    const suffixUrl = 'ls/api/v1/reports/geozones'
    const fullUrl = new URL(suffixUrl, 'https://online.omnicomm.ru/').href;
    const result = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${jwt}`,
      },
      body: JSON.stringify({
        vehicleIds,
        geozonesIds: [],
        timeBegin,
        timeEnd,
        minDurationTime: 300,
        outsideGeozones: true
      })
    });
    const jsonResult = await result.json();
    return jsonResult;
  };
  
  let getVehiclesList = async (jwt) => {
    const suffixUrl = 'ls/api/v1/tree/vehicle'
    const fullUrl = new URL(suffixUrl, 'https://online.omnicomm.ru/').href;
    const result = await fetch(fullUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${jwt}`,
      },
    });
    const jsonResult = await result.json();
    return jsonResult;
  };
  
  const timeFrame = () => {
    const date = new Date()
    // const [ day, month, year ] = date.toLocaleDateString().split('.');

     const [ month, day, year ] = date.toLocaleDateString().split('/');
    console.log(day, month, year)
    const timeBegin = Math.round((new Date(year, month - 1, day).valueOf()) / 1000)
    
    const timeEnd = Math.round(date.valueOf() / 1000)
    return ({ timeBegin, timeEnd });
  }
  
  
  
  let getTempNew = async (jwt, timeBegin, timeEnd, vehicleId) => {
    // console.log(timeBegin, timeEnd)
    
    const suffixUrl = 'ls/api/v1/reports/statistics'
    const fullUrl = new URL(suffixUrl, 'https://online.omnicomm.ru/');
    fullUrl.searchParams.append('timeBegin', timeBegin);
    fullUrl.searchParams.append('timeEnd', timeEnd);
    fullUrl.searchParams.append('dataGroups', '[ae]');
    fullUrl.searchParams.append('vehicles', `[${vehicleId}]`);
    const result = await fetch(fullUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${jwt}`,
      },
    });
    const jsonResult = await result.json();
  
    return jsonResult;
  };
  
  const getDataFromAPI = async () => {
    const { timeBegin, timeEnd } = timeFrame();
    
    const jwt = await login()
    const vehiclesList = await getVehiclesList(jwt)
    const terminalsIds = await vehiclesList.objects.map(({ terminal_id }) => terminal_id)
    const data = await getData(jwt, timeBegin, timeEnd, terminalsIds.slice(0, 5))
    
    const updatedData = await data.map(({
      vehicleId,
      vehicleName,
      geozoneId,
      geozoneName,
      geoInfo: { startDate, endDate, duration }
    }) => ({ vehicleId, vehicleName, geozoneId, geozoneName, startDate, endDate, duration }))

    
   
    const dataWithTemp = await updatedData.map(async (
      { vehicleId, vehicleName, geozoneId, geozoneName, startDate, endDate, duration }
    ) => {
      const temperatureValueIn = await getTempNew(jwt, startDate, startDate + 30, vehicleId)
      const { data: { vehicleDataList } } = temperatureValueIn;
      const temperatureValueOut = await getTempNew(jwt, endDate - 30, endDate, vehicleId)
      return { vehicleId, vehicleName, geozoneId, geozoneName, startDate, endDate, duration, 
        tempIn: vehicleDataList[0].ae.uniDataList[0].univInputMaxValue,
        tempOut: temperatureValueOut.data.vehicleDataList[0].ae.uniDataList[0].univInputMaxValue,
      };
    })
    
    return Promise.all(dataWithTemp)
    
  }
  getDataFromAPI().then((data) => res.send(data))

})

app.get('/api/temperature-report-deviation', (req, res) => {
  let login = async () => {
    const result = await fetch('https://online.omnicomm.ru/auth/login?jwt=1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: 'atktest',
        password: 'atktest1',
      }),
    });
    const jsonResult = await result.json();
    return jsonResult.jwt;
  };
  
  let getData = async (jwt, timeBegin, timeEnd, vehicleIds) => {
    const suffixUrl = 'ls/api/v1/reports/geozones'
    const fullUrl = new URL(suffixUrl, 'https://online.omnicomm.ru/').href;
    const result = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${jwt}`,
      },
      body: JSON.stringify({
        vehicleIds,
        geozonesIds: [],
        timeBegin,
        timeEnd,
        minDurationTime: 300,
        outsideGeozones: true
      })
    });
    const jsonResult = await result.json();
    return jsonResult;
  };
  
  let getVehiclesList = async (jwt) => {
    const suffixUrl = 'ls/api/v1/tree/vehicle'
    const fullUrl = new URL(suffixUrl, 'https://online.omnicomm.ru/').href;
    const result = await fetch(fullUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${jwt}`,
      },
    });
    const jsonResult = await result.json();
    return jsonResult;
  };
  
  const timeFrame = () => {
    const date = new Date()
    // const [ day, month, year ] = date.toLocaleDateString().split('.');

     const [ month, day, year ] = date.toLocaleDateString().split('/');
    console.log(day, month, year)
    const timeBegin = Math.round((new Date(year, month - 1, day).valueOf()) / 1000)
    
    const timeEnd = Math.round(date.valueOf() / 1000)
    return ({ timeBegin, timeEnd });
  }
  
  
  
  let getTempNew = async (jwt, timeBegin, timeEnd, vehicleId) => {
    // console.log(timeBegin, timeEnd)
    
    const suffixUrl = 'ls/api/v1/reports/statistics'
    const fullUrl = new URL(suffixUrl, 'https://online.omnicomm.ru/');
    fullUrl.searchParams.append('timeBegin', timeBegin);
    fullUrl.searchParams.append('timeEnd', timeEnd);
    fullUrl.searchParams.append('dataGroups', '[ae]');
    fullUrl.searchParams.append('vehicles', `[${vehicleId}]`);
    const result = await fetch(fullUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${jwt}`,
      },
    });
    const jsonResult = await result.json();
  
    return jsonResult;
  };
  
  const getDataFromAPI = async () => {
    const { timeBegin, timeEnd } = timeFrame();
    
    const jwt = await login()
    const vehiclesList = await getVehiclesList(jwt)
    const terminalsIds = await vehiclesList.objects.map(({ terminal_id }) => terminal_id)
    const data = await getData(jwt, timeBegin, timeEnd, terminalsIds.slice(0, 5))
    
    const updatedData = await data.map(({
      vehicleId,
      vehicleName,
      geozoneId,
      geozoneName,
      geoInfo: { startDate, endDate, duration }
    }) => ({ vehicleId, vehicleName, geozoneId, geozoneName, startDate, endDate, duration }))

    
   
    const dataWithTemp = await updatedData.map(async (
      { vehicleId, vehicleName, geozoneId, geozoneName, startDate, endDate, duration }
    ) => {
      const temperatureValueIn = await getTempNew(jwt, startDate, startDate + 30, vehicleId)
      const { data: { vehicleDataList } } = temperatureValueIn;
      const temperatureValueOut = await getTempNew(jwt, endDate - 30, endDate, vehicleId)
      return { vehicleId, vehicleName, geozoneId, geozoneName, startDate, endDate, duration, 
        tempIn: vehicleDataList[0].ae.uniDataList[0].univInputMaxValue,
        tempOut: temperatureValueOut.data.vehicleDataList[0].ae.uniDataList[0].univInputMaxValue,
      };
    })
    
    return Promise.all(dataWithTemp)
    
  }

  const findDeviation = async (data) => {
    const filteredData = await data.filter(({ tempIn, tempOut }) => ( tempIn <= 0 || tempIn >= 20 || tempOut <= 0 || tempOut >= 20 ))
    return filteredData
  } 
  getDataFromAPI()
  .then((data) => findDeviation(data))
  .then((data) => res.send(data))

})

// mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
//   if (err) { return console.log(err) }
  app.listen(port, () => {
    console.log(`Server is working on ${port}`);
  });
// });
