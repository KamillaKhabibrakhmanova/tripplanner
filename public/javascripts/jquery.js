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

	});


   	$(".dropdown-menu").on('click', 'li', function(){
		$(this).parent().prev().text($(this).text());
  	});

	
	////Google Maps
	function initialize_gmaps() {
	 
	  // initialize new google maps LatLng object
	  var myLatlng = new google.maps.LatLng(40.705786,-74.007672); //need to query for this each time
	 
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
	 
	  // Add the marker to the map by calling setMap()
	  marker.setMap(map);
	}
	 
	$(document).ready(function() {
	  initialize_gmaps();
}); 