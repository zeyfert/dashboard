const express = require('express');
const mongoose = require('mongoose');
let { port, db, apiToken } = require('./variables');
const axios = require('axios');

const app = express();

const statisticsScheme = mongoose.Schema(
  { City: String, WebStudies: Number, Hosting: Number, University: Number},
  { collection: 'data' }
);

const peopleScheme = mongoose.Schema(
  { City: String, People: Number},
  { collection: 'number' }
);

const statisticsModel = mongoose.model('data', statisticsScheme);

const statisticsModelPeople = mongoose.model('number', peopleScheme);

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

app.get('/api/bitcoin/hourly', (req, res) => {
  axios.get('https://min-api.cryptocompare.com/data/v2/histohour?fsym=BTC&tsym=USD&limit=10', {
    headers: {
      'authorization': `Apikey ${apiToken}`,
    },
  }).then((data) => res.send(data.data.Data.Data.map(({ time, close }) => ({ time, close }))));
});

app.get('/api/bitcoin/daily', (req, res) => {
  axios.get('https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=7', {
    headers: {
      'authorization': `Apikey ${apiToken}`,
    },
  }).then((data) => res.send(data.data.Data.Data.map(({ time, close }) => ({ time, close }))));
});

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) { return console.log(err) }
  app.listen(port, () => {
    console.log(`Server is working on ${port}`);
  });
});
