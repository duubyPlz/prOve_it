#!/usr/bin/env node
/* 
*Accessed on 4/5/2016 
*/
var frisby = require('frisby');

var URL = 'http://www.wolfofbridgest.com/';
var path = require('path');
var fs = require('fs');
var FormData = require('form-data');
var token = '5D7F960526BD4246AC6D';

var priceFilePath = path.resolve(__dirname, 'input_files/stock_price.csv');
var characteristicFilePath = path.resolve(__dirname, 'input_files/event_char.csv');

var form = new FormData();
form.append('stock_file', fs.createReadStream(priceFilePath), {
  knownLength: fs.statSync(priceFilePath).size  // we need to set the knownLength so we can call  form.getLengthSync()
});

form.append('event_file', fs.createReadStream(characteristicFilePath), {
  knownLength: fs.statSync(characteristicFilePath).size
});


frisby.create('Upload normally')
  .post(URL+'api/v4.0/event_study_files/',
  form,
  {
    json: false,
    headers: {
      'content-type': 'multipart/form-data; boundary=' + form.getBoundary(),
      'content-length': form.getLengthSync()
    }
  })
  .timeout(100000)
  //.inspectJSON()
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .toss();

// -------------------------------------

frisby.create('Send request for cumulative return for China_Growth_Rate_Change and all companies')
  .get(URL + 'api/v4.0/cumulative_returns/?token='+token+'&lower_win=-5&upper_win=5&event_type=China_Growth_Rate_Change&China_Growth_Rate_Change_lower=0&China_Growth_Rate_Change_upper=2')
  .timeout(100000) // 10 second timeout
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON(
    {
      "log": {
        "developerTeam": "Wolf Of Bridge St",
        "input": [],
        "moduleName": "Event Study",
        "moduleVersion": "v4.0",
        "parameters": {
          "China_Growth_Rate_Change_lower": 0,
          "China_Growth_Rate_Change_upper": 2,
          "event_type": [
            "China_Growth_Rate_Change"
          ],
          "lower_win": -5,
          "token": "5D7F960526BD4246AC6D",
          "upper_win": 5
        },
        "response": "Success",
      },
      "output": {
        "average": [
          -0.006667,
          -0.01,
          -0.006667,
          -0.006667,
          -0.006667,
          -0.015,
          -0.001667,
          -0.006667,
          -0.01,
          -0.013333,
          -0.013333
        ],
        "cumulativeReturns": {
          "AAC.AX": {
            "cumulativeReturns": [
              -0.02,
              -0.03,
              -0.02,
              -0.02,
              -0.02,
              -0.045,
              -0.005,
              -0.02,
              -0.03,
              -0.04,
              -0.04
            ],
            "events": [
              {
                "eventDate": "2012-07-30",
                "eventType": "China_Growth_Rate_Change",
                "eventValue": 1
              }
            ]
          },
          "BGA.AX": {
            "cumulativeReturns": [],
            "events": []
          },
          "CCL.AX": {
            "cumulativeReturns": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "events": [
              {
                "eventDate": "2014-10-06",
                "eventType": "China_Growth_Rate_Change",
                "eventValue": 1
              }
            ]
          },
          "CGC.AX": {
            "cumulativeReturns": [],
            "events": []
          },
          "ELD.AX": {
            "cumulativeReturns": [],
            "events": []
          },
          "ELDDA.AX": {
            "cumulativeReturns": [],
            "events": []
          },
          "FGL.AX": {
            "cumulativeReturns": [],
            "events": []
          },
          "GFF.AX": {
            "cumulativeReturns": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "events": [
              {
                "eventDate": "2014-10-06",
                "eventType": "China_Growth_Rate_Change",
                "eventValue": 1
              }
            ]
          },
          "GNC.AX": {
            "cumulativeReturns": [],
            "events": []
          },
          "RIC.AX": {
            "cumulativeReturns": [],
            "events": []
          },
          "SHV.AX": {
            "cumulativeReturns": [],
            "events": []
          },
          "TGR.AX": {
            "cumulativeReturns": [],
            "events": []
          },
          "TWE.AX": {
            "cumulativeReturns": [],
            "events": []
          },
          "WBA.AX": {
            "cumulativeReturns": [],
            "events": []
          }
        }
      }
    }
  )
.toss();

var form = new FormData();
form.append('stock_price_file', '');

form.append('stock_characteristic_file', '');


frisby.create('Uploading incorrectly formatted files')
  .post(URL+'api/v4.0/event_study_files/',
  form,
  {
    json: false,
    headers: {
      'content-type': 'multipart/form-data; boundary=' + form.getBoundary(),
      'content-length': form.getLengthSync()
    }
  })
  .timeout(100000)
  //.inspectJSON()
  .expectJSON({
   log: 
   { developerTeam: 'Wolf Of Bridge St',
     errors: 
      { invalidForm: 
         { details: 'The data sent was incomplete or incorrect.',
           name: 'Invalid Form' } },
     response: 'Error' }

   })
  .expectHeaderContains('content-type', 'application/json')
  .toss();

// -------------------------------------
var priceFilePath = path.resolve(__dirname, 'input_files/random1.csv');
var characteristicFilePath = path.resolve(__dirname, 'input_files/random2.csv');
var form = new FormData();
form.append('stock_price_file', fs.createReadStream(priceFilePath), {
  knownLength: fs.statSync(priceFilePath).size  // we need to set the knownLength so we can call  form.getLengthSync()
});

form.append('stock_characteristic_file', fs.createReadStream(characteristicFilePath), {
  knownLength: fs.statSync(characteristicFilePath).size 
});


frisby.create('Uploading incorrectly formatted files')
  .post(URL+'api/v4.0/event_study_files/',
  form,
  {
    json: false,
    headers: {
      'content-type': 'multipart/form-data; boundary=' + form.getBoundary(),
      'content-length': form.getLengthSync()
    }
  })
  .timeout(100000)
  //.inspectJSON()
  .expectJSON({
   log: 
   { developerTeam: 'Wolf Of Bridge St',
     errors: 
      { invalidForm: 
         { details: 'The data sent was incomplete or incorrect.',
           name: 'Invalid Form' } },
     response: 'Error' }

   })
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .toss();

// -------------------------------------
var priceFilePath = path.resolve(__dirname, 'input_files/event_char.csv');
var form = new FormData();
form.append('stock_price_file', fs.createReadStream(priceFilePath), {
  knownLength: fs.statSync(priceFilePath).size  // we need to set the knownLength so we can call  form.getLengthSync()
});

frisby.create('Uploading incorrectly formatted files')
  .post(URL+'api/v4.0/event_study_files/',
  form,
  {
    json: false,
    headers: {
      'content-type': 'multipart/form-data; boundary=' + form.getBoundary(),
      'content-length': form.getLengthSync()
    }
  })
  .timeout(100000)
  //.inspectJSON()
  .expectJSON({
   log: 
   { developerTeam: 'Wolf Of Bridge St',
     errors: 
      { invalidForm: 
         { details: 'The data sent was incomplete or incorrect.',
           name: 'Invalid Form' } },
     response: 'Error' }

   })
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .toss();
// -------------------------------------
var priceFilePath = path.resolve(__dirname, 'input_files/broken_event_char.csv');
var characteristicFilePath = path.resolve(__dirname, 'input_files/broken_stock_price.csv');
var form = new FormData();
form.append('stock_price_file', fs.createReadStream(priceFilePath), {
  knownLength: fs.statSync(priceFilePath).size  // we need to set the knownLength so we can call  form.getLengthSync()
});

form.append('stock_characteristic_file', fs.createReadStream(characteristicFilePath), {
  knownLength: fs.statSync(characteristicFilePath).size 
});


frisby.create('Uploading incorrectly formatted files')
  .post(URL+'api/v4.0/event_study_files/',
  form,
  {
    json: false,
    headers: {
      'content-type': 'multipart/form-data; boundary=' + form.getBoundary(),
      'content-length': form.getLengthSync()
    }
  })
  .timeout(100000)
  //.inspectJSON()
  .expectJSON({
   log: 
   { developerTeam: 'Wolf Of Bridge St',
     errors: 
      { invalidForm: 
         { details: 'The data sent was incomplete or incorrect.',
           name: 'Invalid Form' } },
     response: 'Error' }

   })
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .toss();
