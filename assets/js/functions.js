$(function() {
    Cookies.remove('zip');
    Cookies.remove('type');
    Cookies.remove('bathrooms');
    Cookies.remove('bedrooms');
    Cookies.remove('minPrice');
    Cookies.remove('maxPrice');
});

$('#send').click(function(e){
	e.preventDefault();
	var zip = $('#zip').val();
	var propType = $('#prop-type').val();
	var bathrooms = $('#bath').val();
	var bedrooms = $('#bed').val();
	var minP = $('#min-price').val();
	var maxP = $('#max-price').val();

	if((!isNaN(zip)) && (!isNaN(bathrooms)) && (!isNaN(bedrooms)) && (!isNaN(minP)) && (!isNaN(maxP))) {
		Cookies.set('zip', zip);
		Cookies.set('type', propType);
		Cookies.set('bathrooms', bathrooms);
		Cookies.set('bedrooms', bedrooms);
		Cookies.set('minPrice', minP);
		Cookies.set('maxPrice', maxP);
		window.location.href = 'probando.html';
	} else {
		alert ("Please, all of the values must be numeric excepting \"Property Type\"");
	}
});