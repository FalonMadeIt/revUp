// TODO: put initialization logic here


'use strict';

var bulk = require('bulk-require');
var router = require('./router');

// Require all of our controllers
bulk(__dirname, ['controllers/**/*.js']);

// Start the router
router.init();








// var $ = require("jquery");
// $.ajax({
//     url: "car-data.data",
//     method: 'GET'
//   })
  
//   .then(parseCarData)
  
//   .then( function name(cars) {
//     console.log(cars);
//   }) ;
  
  
//   function parseCarData(carData) {
//     return carData
//       .split('\n')
//       .map(function (record, i) {
//         var cells = record.split(',');
        
//         return {
//           id: i,
//           make: cells[2],
//           cityMpg: cells[23],
//           highwayMpg: cells[24],
//           price: cells[25]
//         };
//       });
//   }