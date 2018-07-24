$(function() {
    Cookies.remove('zip');
    Cookies.remove('type');
    Cookies.remove('rent');
    Cookies.remove('bathrooms');
    Cookies.remove('bedrooms');
    Cookies.remove('minPrice');
    Cookies.remove('maxPrice');
});

$('#send').click(function(e){
	e.preventDefault();

	var compare = /^[0-9]+$/;

	var zip = parseInt($('#zip').val());
	var propType = parseInt($('#prop-type').val());
	var bathrooms = parseInt($('#bath').val());
	var bedrooms = parseInt($('#bed').val());
	var minP = parseInt($('#min-price').val());
	var maxP = parseInt($('#max-price').val());
	var rent = parseInt($('#rent').val());

	if( rent =="For Rent"){
		rent = "true";
	} else {rent = "false";}

	if(zip != ""){
		if((zip % 1 == 0) && (bathrooms % 1 == 0) && (bedrooms % 1 == 0) && (minP % 1 == 0) && (maxP % 1 == 0)) {
			if(parseInt(maxP) >= parseInt(minP)){
				Cookies.set('zip', zip);
				Cookies.set('type', propType);
				Cookies.set('bathrooms', bathrooms);
				Cookies.set('rent', rent);
				Cookies.set('bedrooms', bedrooms);
				Cookies.set('minPrice', minP);
				Cookies.set('maxPrice', maxP);
				window.location.href = 'https://soulierproperties.com/list-properties/';
			} else {
				alert ("Minimum price MUST be lower than maximum price");
			}
		} else {
			alert ("Please, all of the values must be numeric excepting \"Property Type\"");
		}
	} else {alert ("ZIP field can't be empty");}
});