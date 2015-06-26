'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');
var c3 = require('c3');

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
   
   renderChart(car, carsArray);
  }
  
  function renderChart(car, carsArray) {
  
    
    var under = carsArray.filter(function (b) {
      console.log(b);
      return b.price < 10000;
    }).length;
    
    var same = carsArray.filter(function (b) {
      return b.price == car.price;
      // && < 20000;
    }).length;
    
    var over = carsArray.filter(function (b) {
      return b.price > 20000;
     }).length;
    
    // for (var i = 0; i < carsArray.length; i++) {
      
    //   if (carsArray.price < "10000") {
    //     var under = carsArray[i];
    //   } 
    //   else if(carsArray.price > 10000 && price < 20000 ) {
    //     var average = carsArray[i];
    //   }
    //   else{
    //     var over = carsArray[i];
    //   }
    // }
    
    c3.generate({
      bindto: '.car-chart',
      data: {
        columns: [
          [' Other cars Under 10,000', under],
          ['Same Priced cars', same],
          ['Other cars Over 20,000', over]
        ],
        type : 'pie'
      },
      color: {
        pattern: ['#3FBEBB', '#FF5843', '#39B54A']
      }
    });
  }
  
});

