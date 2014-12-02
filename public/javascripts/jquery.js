$(document).on('ready', function() {
    var count = 2;
    var buttonMaker = function(count) { return "<button type=\"button\" class=\"btn btn-default day\" id=\"click-"+count+"\" >Day " + count + "</button>" };
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



//Adding this clickhandler to all buttons
function dayClickHandler() {
    $('.day').on('click',function(){
        var $this = $(this);
        var dayNumber = $this.attr('id').split('-')[1];
        $.get('/days/'+dayNumber,function(data){
            //Object {_id: "547e400812852eb8f15954df", day_number: 1, __v: 3, thingsToDo: Array[1], restaurants: Array[1]…}
            // console.log('DATA ',typeof data)
            
            var parsedData = data
            // var parsedData=data
            

            var hotelList = $('#hotel-list');
            var hotelName = parsedData.hotels[0].name;
            hotelList.append(hotelName)
            // console.log(parsedData)

            var thingsList = $('#things-list');
            thingsList.empty()
            $(parsedData.thingsToDo).each(function(index,thing){
                thingsList.append(thing.name)
            })

            var restaurantsList = $('#restaurants-list-list');
            $(parsedData.restaurants).each(function(index,restaurant){
                thingsList.append(restaurant.name)
            });
            
        })
    })
};

dayClickHandler();

    $('#add_day').on('click', function() {
        
        var newButton = $('#day-button-row').append(buttonMaker(count))
        console.log(newButton)
        dayClickHandler();
        // newButton.on('click',function(){
        //     var $this = $(this);
        //     var dayNumber = $this.attr('id').split('-')[1];
        //     $.get('/'+dayNumber)
        // })
        count++;
        $.post('/days',{dayNumber:count-1}).done(function(){
            

        })
            
    });


    $(".dropdown-toggle-hotels").on('click', 'li', function() {
        var selected= $(this).parent().prev();
        selected.text($(this).text());
        selected.data($(this).data())
        var self = $(this);
        
        
    });



    ///ADDING TO DB FOR ALL ATTRACTIONS
    $('[id*="add-"]').on('click',function(event){
        var element = $(this).prev().children().first();
        var attractionType = $(event.target).attr('id').split('-')[1];
        
        $.post('/days/'+(count-1)+'/attractions',{type:attractionType,
                                                    name:element.text()})
    })





    $("#add-hotel").on('click', function() {
        var element = $(this).prev().children().first();
        
        var element = $(this).prev().children().first();
        //console.log('Element log',element.data()[0])	//Gives lat, [1] gives long

        createNewMarker(element.data()[0],element.data()[1],element.text());

        $('.active #hotel-list').append('<p>' + element.text() + '</p>');
        // $.post('/days/'+(count-1)+'/attractions',{hotel:element.text()})
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
        // $.post('/days/'+(count-1)+'/attractions',{restaurant:element.text()})
            
        
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
        // var element = $(this).prev().children().first().text();
        var element = $(this).prev().children().first();
        //console.log('Element log',element.data()[0])	//Gives lat, [1] gives long
        createNewMarker(element.data()[0],element.data()[1],element.text())
        $('.active #things-list').append('<p>' + element.text() + '</p>');
        // $.post('/days/'+(count-1)+'/attractions',{thing:element.text()})
        
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
        // // marker2.setMap(map)
        // for (var i = 0; i < markers.length; i++) {
        //     markers.setMap(map);
        // }
        // markers.forEach(function(element) {
        //     element.setMap(map)
        // })

    }


    initialize_gmaps();
});