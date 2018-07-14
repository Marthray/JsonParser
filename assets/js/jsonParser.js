$(function() { //Esta función hace cosas cuando el html carga
	//obteniendo valores de las cookies
	var zip;
	var propType;
	var bathrooms;
	var bedrooms;
	var minP;
	var maxP;

	cargarCookie();
	parseJson();
});

function cargarCookie(){
	zip = Cookies.get('zip');
	propType = Cookies.get('type');
	bathrooms = Cookies.get('bathrooms');
	bedrooms = Cookies.get('bedrooms');
	minP = Cookies.get('minPrice');
	maxP = Cookies.get('maxPrice');

	//Eliminando las cookies porque ya no las necesito
	Cookies.remove('zip');
    Cookies.remove('type');
    Cookies.remove('bathrooms');
    Cookies.remove('bedrooms');
    Cookies.remove('minPrice');
    Cookies.remove('maxPrice');

    /*$('#result').append(`
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
    	`)*/
}

function parseJson(){

	var jsonRetsLy = "https://rets.io/api/v2/test/listings?access_token=7f8afaacb6f6f5cd2c80f3ee8f9bb103&PostalCode[eq]="+zip+"&PropertyType[in]="+propType+"&BathroomsTotalInteger[lte]="+bathrooms+"&BedroomsTotal[lte]="+bedrooms+"&OriginalListPrice[gte]="+minP+"&OriginalListPrice[lte]="+maxP+"&limit=100";
    $.getJSON(jsonRetsLy, function (listings) {
    
	    for (var i=0;i<listings.bundle.length;++i)
	    {
	        $('#result').append(`
	        	<div style="border: 1px solid;">
	        	<p>Zip: `+listings.bundle[i].PostalCode+`</p>
	        	<p>Bathrooms: `+listings.bundle[i].BathroomsTotalInteger+`</p>
	        	<p>Bedrooms: `+listings.bundle[i].BedroomsTotal+`</p>
	        	<p>Property Type: `+listings.bundle[i].PropertyType+`</p>
	        	<p>Pricing: `+listings.bundle[i].OriginalListPrice+`</p>
	        	</div>`);
	    }
	});
}