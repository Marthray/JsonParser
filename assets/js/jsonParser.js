$(function() {
	//obteniendo valores de las cookies

    var zip = Cookies.get('zip');
	var propType = Cookies.get('type');
	var bathrooms = Cookies.get('bathrooms');
	var bedrooms = Cookies.get('bedrooms');
	var minP = Cookies.get('minPrice');
	var maxP = Cookies.get('maxPrice');

	//Eliminando las cookies porque ya no las necesito
	Cookies.remove('zip');
    Cookies.remove('type');
    Cookies.remove('bathrooms');
    Cookies.remove('bedrooms');
    Cookies.remove('minPrice');
    Cookies.remove('maxPrice');

    $('#result').append(`
    	<div>
    		`+zip+`
    	</div>
    	<div>
    		`+propType+`
    	</div>
    	<div>
    		`+bathrooms+`
    	</div>
    	<div>
    		`+bedrooms+`
    	</div>
    	<div>
    		`+minP+`
    	</div>
    	<div>
    		`+maxP+`
    	</div>
    	`)
});