// TODO: put initialization logic here

var $ = require("jquery");

$.ajax({
    url: "car-data.data",
    method: 'GET'
  })
  
  .then(parseCarData)
  
  .then( function name(cars) {
    console.log(cars);
  }) ;
  
  
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