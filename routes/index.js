var express = require('express');
var router = express.Router();
var models = require('../models');
var q = require('q');

/* GET home page. */
router.get('/', function(req, res) {
  var hotels;
  var restaurants;
  var things;


  ////Callback HELL
  // models.Hotel.find(function(err, hotelResults) {
  //   hotels = hotelResults;
	 //    models.Restaurant.find(function(err, restaurantResults) {
	 //  		restaurants=restaurantResults;
		// 	  	models.ThingsToDo.find(function(err, thingResults) {
		// 		  	things=thingResults;
				  	
		  		 		// res.render('index', { hotels: hotels,
						  	// title: "Trip Planner",
						  	// restaurants : restaurants,
						  	// things_to_do: things })	
		//   		})
	 //  	})
  // });
	models.Hotel.find({},function(err,things){
		console.log(things)
	})

	var hotelPromise = models.Hotel.find().exec();  //.exec method returns a promise
	var resPromise = models.Restaurant.find().exec();
	var thingsPromise = models.ThingsToDo.find().exec();

	q.all([hotelPromise,resPromise,thingsPromise]).then(function(results){
		
		// console.log('RESTAURANTS ',resPromise)
		// console.log('THINGS ',thingsPromise)
		// console.log(results);
		res.render('index', { 
				title: "Trip Planner",
				hotels: results[0],
			  	restaurants : results[1],
			  	things_to_do: results[2] }
		)

	})

})




module.exports = router;


 