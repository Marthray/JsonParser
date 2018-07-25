$(function() {
    Cookies.remove('zip');
    Cookies.remove('type');
    Cookies.remove('rent');
    Cookies.remove('bathrooms');
    Cookies.remove('bedrooms');
    Cookies.remove('minPrice');
    Cookies.remove('maxPrice');
});

function init(param){
	if (param == ""){
		return "0"
	} else {return param}
}

$('#send').click(function(e){
	e.preventDefault();

	var compare = /^[0-9]+$/;

	var zip = init($('#zip').val());
	var propType = $('#prop-type').val();
	var bathrooms = init($('#bath').val());
	var bedrooms = init($('#bed').val());
	var minP = init($('#min-price').val());
	var maxP = init($('#max-price').val());
	var rent = $('#rent').val();

	if( rent =="For Rent"){
		rent = "true";
	} else {rent = "false";}

	if(zip != ""){
		if((parseInt(zip) % 1 == 0) && (parseInt(bathrooms) % 1 == 0) && (parseInt(bedrooms) % 1 == 0) && (parseInt(minP) % 1 == 0) && (parseInt(maxP) % 1 == 0)) {
			if(parseInt(maxP) >= parseInt(minP)){
				console.log(accounting.formatNumber(parseInt(zip)));
				Cookies.set('zip', zip);
				Cookies.set('type', propType);
				Cookies.set('bathrooms', bathrooms);
				Cookies.set('rent', rent);
				Cookies.set('bedrooms', bedrooms);
				Cookies.set('minPrice', minP);
				Cookies.set('maxPrice', maxP);
				window.location.href = 'https://soulierproperties.com/list-properties/';
				//window.location.href = 'probando.html';
			} else {
				alert ("Minimum price MUST be lower than maximum price");
			}
		} else {
			alert ("Please, all of the values must be numeric excepting \"Property Type\"");
		}
	} else {alert ("ZIP field can't be empty");}
});