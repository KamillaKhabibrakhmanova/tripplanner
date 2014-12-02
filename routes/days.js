var express = require('express');
var router = express.Router();
var models = require('../models');
var findOrCreate = require('mongoose-findorcreate');
var q = require('q');


router.post('/',function(req,res){
	var dayNumber = +req.body.dayNumber;
	
	models.Day.findOrCreate({day_number:dayNumber},function(err,results){
		if(err) console.log(err);
	})

	res.status(200).send();

})

router.post('/:dayId/attractions',function(req,res,err){
		var dayId = +req.params.dayId;
		// console.log('REQ BODY ',req.body)
		var attractionType = req.body.type;
		var attractionName = req.body.name;
		// console.log(attractionName)
		console.log(attractionType)
		console.log(attractionName)

		var dayPromise = models.Day.findOne({day_number: dayId}).exec();

		if(attractionType === 'hotel') {
   			console.log('HOTEL IF')
    		var hotelPromise = models.Hotel.findOne({name: attractionName}).exec();

		    q.all([dayPromise, hotelPromise]).then(function(results) {
		        var day = results[0];
		        var hotel = results[1];
		        day.hotels.push(hotel);
		        day.save();
		    })
		}
		
			else if (attractionType==='thing'){
				console.log('THING IF')
    			var thingPromise = models.ThingsToDo.findOne({name: attractionName}).exec();
    			
			    q.all([dayPromise, thingPromise]).then(function(results) {
			        var day = results[0];
			        var thing = results[1];
			        day.thingsToDo.push(thing);
			        day.save();
			    })
			}
			else if (attractionType==='restaurant'){
				console.log('RESTAURANT IF')
				var restaurantPromise = models.Restaurant.findOne({name: attractionName}).exec();
				console.log('LINE 57')
		    	q.all([dayPromise, restaurantPromise]).then(function(results) {
			        
			        var day = results[0];
			        var restaurant = results[1];
			        day.restaurants.push(restaurant);
			        day.save();
		    	})
			}

			// if(err) console.log('error ',err)	//why is this logging?
	res.status(200).send();	
})




router.get('/:dayNumber',function(req,res){
	console.log("GOT HERE");
	var dayNumber=req.params.dayNumber;

	models.Day.findOne({day_number:dayNumber},function(err,thisDay){
		res.json(thisDay)
	})
	
})


module.exports = router


