$(document).on('ready', function() {
    var button = "<button type=\"button\" class=\"btn btn-default\">";
    var count = 4;
    var hotels = $('#hotels');

///Populating dropdowns, adding database ID to URL

    all_hotels.forEach(function(element) {

    	var newElement = $('<li id=\"' + element._id + '\">' + element.name + '</a></li>');
    	newElement.data(element.place[0].location);
        hotels.append(newElement)

    })
    var things = $('#things');
    all_things_to_do.forEach(function(element) {
    	var newElement = $('<li id=\"' + element._id + '\">' + element.name + '</a></li>');
    	newElement.data(element.place[0].location);
        things.append(newElement)

    })

    var restaurants = $('#restaurants');
    all_restaurants.forEach(function(element) {

    	var newElement = $('<li id=\"' + element._id + '\">' + element.name + '</a></li>');
    	newElement.data(element.place[0].location);        
    	restaurants.append(newElement)


    })
// Switching between different days

    $('.day').on('click', function(event) {
        var id = $(event.target).attr('id');
        id_num = id[6];
        $('.plans').css('visibility', 'hidden').css('display', 'none')
            .removeClass('active');
        $('#plans-' + id_num).addClass("col-md-4 active")
            .css("visibility", "visible").css('display', 'inline');

    })




    $('#add_day').on('click', function() {
        $('#button-row :nth-child(' + (count - 1) + ')').after(button + "Day " + count + "</button>");
        count++;
    });


    $(".dropdown-toggle-hotels").on('click', 'li', function() {
        var selected= $(this).parent().prev();
        selected.text($(this).text());
        selected.data($(this).data())
        var self = $(this);
        
        
    });

    $("#add-hotel").on('click', function() {
        var element = $(this).prev().children().first();
        
        var element = $(this).prev().children().first();
        //console.log('Element log',element.data()[0])	//Gives lat, [1] gives long

        createNewMarker(element.data()[0],element.data()[1],element.text());

        $('.active #hotel-list').append('<p>' + element.text() + '</p>');
    });



    $(".dropdown-toggle-restaurants").on('click', 'li', function() {
       var selected= $(this).parent().prev();
        selected.text($(this).text());
        selected.data($(this).data())
        var self = $(this);
        console.log('SELECTED ',self.data())


    });

    $("#add-restaurant").on('click', function() {
        var element = $(this).prev().children().first();
        //console.log('Element log',element.data()[0])	//Gives lat, [1] gives long
        createNewMarker(element.data()[0],element.data()[1],element.text())


        $('.active #restaurants-list').append('<p>' + element.text() + '</p>');

        
    });


    $(".dropdown-toggle-things").on('click', 'li', function() {
        var selected= $(this).parent().prev();
        selected.text($(this).text());
        selected.data($(this).data())
        var self = $(this);
        console.log('SELECTED ',self.data())
    });

    $("#add-thing").on('click', function() {
        console.log($(this).prev().first())
        var element = $(this).prev().children().first().text();
        var element = $(this).prev().children().first();
        //console.log('Element log',element.data()[0])	//Gives lat, [1] gives long
        createNewMarker(element.data()[0],element.data()[1],element.text())

        $('.active #things-list').append('<p>' + element.text() + '</p>');
    });




    ////Google Maps

    var markers = [];


    function createNewMarker(lat, lon, title) {
        var position = new google.maps.LatLng(lat, lon);
        var newMarker = new google.maps.Marker({
            position: position,
            title: title
        });
        markers.push(newMarker);
        initialize_gmaps();
    };

    function initialize_gmaps(inputMarkerLat, inputMarkerLon) {
        var markerLat = inputMarkerLat || 40.705786
        var markerLon = inputMarkerLon || -74.007672
            // initialize new google maps LatLng object
        var myLatlng = new google.maps.LatLng(40.705786, -74.007672); //need to query for this each time
        // console.log('LATLNG ', myLatlng)
            // set the map options hash
        var mapOptions = {
            center: myLatlng,
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        };

        // get the maps div's HTML obj
        var map_canvas_obj = document.getElementById("map-canvas");

        // initialize a new Google Map with the options
        var map = new google.maps.Map(map_canvas_obj, mapOptions);

        // Add the marker to the map
        var marker = new google.maps.Marker({
            position: myLatlng,
            title: "Hello World!"
        });

        var marker2 = new google.maps.Marker({
            position: new google.maps.LatLng(-.2, 25),
            title: 'Africa'
        })

        // Add the marker to the map by calling setMap()
        // marker.setMap(map);
        // marker2.setMap(map)
        for (var i = 0; i < markers.length; i++) {
            markers.setMap(map);
        }
        // markers.forEach(function(element) {
        //     element.setMap(map)
        // })

    }


    initialize_gmaps();



});