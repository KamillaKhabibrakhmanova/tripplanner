$(document).on('ready', function() {
	var button = "<button type=\"button\" class=\"btn btn-default\">";
	var count = 4;
	var hotels = $('#hotels');

	///Populating dropdowns, adding database ID to URL
	all_hotels.forEach(function(element){
		hotels.append('<li id=\"'+element._id+'\">'+element.name+'</a></li>')
		})
	var things = $('#things');
	all_things_to_do.forEach(function(element){
		things.append('<li id=\"'+element._id+'\">'+element.name+'</a></li>')
		})

	var restaurants = $('#restaurants');
	all_restaurants.forEach(function(element){
		restaurants.append('<li id=\"'+element._id+'\">'+element.name+'</a></li>')
		})
	$('#add_day').on('click', function() {
		$('#button-row :nth-child('+ (count-1) + ')').after(button + "Day " + count + "</button>");
		count ++;
	});

	


   	$(".dropdown-menu").on('click', 'li', function(){
		$(this).parent().prev().text($(this).text());
		console.log(this.id)
  	});

	
	////Google Maps

	var markers=[];


	function newMarker (lat,lon,title){
		var position = new google.maps.LatLng(lat,lon);
		var marker = new google.maps.Marker({
			position:position,
			title:title
		});
		markers.push(newMarker);
	};

	function initialize_gmaps(inputMarkerLat,inputMarkerLon) {
	 var markerLat = inputMarkerLat || 40.705786
	 var markerLon = inputMarkerLon || -74.007672
	  // initialize new google maps LatLng object
	  var myLatlng = new google.maps.LatLng(40.705786,-74.007672); //need to query for this each time
	 	console.log('LATLNG ',myLatlng)
	  // set the map options hash
	  var mapOptions = {
	    center: myLatlng,
	    zoom: 8,
	    mapTypeId: google.maps.MapTypeId.ROADMAP,
	  };
	 
	  // get the maps div's HTML obj
	  var map_canvas_obj = document.getElementById("map-canvas");
	 
	  // initialize a new Google Map with the options
	  var map = new google.maps.Map(map_canvas_obj, mapOptions);
	 
	  // Add the marker to the map
	  var marker = new google.maps.Marker({
	    position: myLatlng,
	    title:"Hello World!"
	  });

	  var marker2 = new google.maps.Marker({
	  	position: new google.maps.LatLng(-.2,25),
	  	title:'Africa'
	  })
	 
	  // Add the marker to the map by calling setMap()
	  // marker.setMap(map);
	  // marker2.setMap(map)
	  markers.forEach(function(element){
	  	element.setMap(map)
	  })

	}
	 
	
	  initialize_gmaps();



});