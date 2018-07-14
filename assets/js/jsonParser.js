$(function() { //Esta función hace cosas cuando el html carga
	//obteniendo valores de las cookies
	var zip;
	var propType;
	var bathrooms;
	var bedrooms;
	var minP;
	var maxP;

	cargarCookie();
});

function cargarCookie(){
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
	$.ajax({
	    url: "https://rets.io/api/v2/test/listings?access_token=7f8afaacb6f6f5cd2c80f3ee8f9bb103&PostalCode[eq]="+zip+"&PropertyType[in]="+propType+"&BathroomsTotalInteger[eq]="+bathrooms+"&BedroomsTotal[eq]="+bedrooms+"&OriginalListPrice[gte]="+minP+"&OriginalListPrice[lte]="+maxP+"&limit=100",
	    //force to handle it as text
	    dataType: "text",
	    success: function(data) {

	        //data downloaded so we call parseJSON function 
	        //and pass downloaded data
	        var listings = $.parseJSON(data);
	        //now json variable contains data in json format
	        //let's display a few items
	        for (var i=0;i<listings.length;++i)
	        {
	            $('#result').append(`
	            	<div>
	            	<p>Zip: `+listings+`</p>
	            	</div>`);
	        }
	    }
	});
}