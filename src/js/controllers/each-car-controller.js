'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');

router.route( 'cars/:id', function (carId) {
  $.ajax({
    url: "car-data.data",
    method: 'GET'
  })
	
	.then(parseCarData)
  .then(renderEachCar)

  
  function parseCarData(carData) {
    return carData
      .split('\n')
      .map(function (record, i) {
        var cells = record.split(',');
        
        return {
          id: i,
          make: cells[2],
          cityMpg: cells[23],
          highwayMpg: cells[24],
          price: cells[25]
        };
      });
  }
	
  
  function renderEachCar(carsArray) {
    var car = _.findWhere(carsArray, { id: parseInt(carId) });
    var eachCarTemplate = views['each-car-template'];
    var templateFn = _.template(eachCarTemplate, { variable: 'm' });
    var carsHTML = templateFn({ car: car });
    
    $('.main-content').html(carsHTML);
  }
});

