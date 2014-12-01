$(document).on('ready', function() {
var button = "<button type=\"button\" class=\"btn btn-default\">";
var count = 4;

$('#add_day').on('click', function() {

	$('#button-row :nth-child('+ (count-1) + ')').after(button + "Day " + count + "</button>");
	count ++;
});

});