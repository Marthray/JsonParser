/*function getUrlParameter(sParam) { //param via get
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}*/
function $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}

$(function() { //Esta función hace cosas cuando el html carga
	//obteniendo valores de las cookies
	var listingId = $_GET('id');
	console.log(listingId);
	var jsonRetsLy = "https://rets.io/api/v2/test/listings?access_token=7f8afaacb6f6f5cd2c80f3ee8f9bb103&ListingId[eq]="+listingId;
	$.getJSON(jsonRetsLy, function (unique) {
		for (var i=0;i<unique.bundle.length;++i){
        	$('#unique-property').append(`
        	<div class="listing row">
	        	<div class="col-lg-6 info-left-property">
	        		<a class="figure-image magnific" href="`+unique.bundle[i].Media[0].MediaURL+`" target="_self"><img src="`+unique.bundle[i].Media[0].MediaURL+`" alt="`+unique.bundle[i].UnparsedAddress+`"></a>
	        	</div>
	        	<div class="col-lg-6 info-right-property">
	        		<h1>`+unique.bundle[i].UnparsedAddress+`</h1>
	        		<h2>$`+unique.bundle[i].OriginalListPrice+`</h2>
	        		<p>Year Built: `+unique.bundle[i].YearBuilt+`</p>
	        		<p>Bathrooms: `+unique.bundle[i].BathroomsTotalInteger+`</p>
	        		<p>Bedrooms: `+unique.bundle[i].BedroomsTotal+`</p>
	        	</div>

	        	<p>Zip: `+unique.bundle[i].PostalCode+`</p>
	        	
	        	<p>Property Type: `+unique.bundle[i].PropertySubType+`</p>
	        	<p>Pricing: `+unique.bundle[i].OriginalListPrice+`</p>
	        	<div id="Media`+i+`">
                </div>`+

	        	//A partir de aquí va la data de unique en especifico

	        	`<p>Address: `+unique.bundle[i].UnparsedAddress+`</p>
	        	 <p>Year Built: `+unique.bundle[i].YearBuilt+` , `+unique.bundle[i].YearBuiltDetails+`</p>
	        	 <p>Description: `+unique.bundle[i].PropertySubType+` , `+unique.bundle[i].InteriorFeatures+`</p>
	        	 <p>Furnished?: `+unique.bundle[i].Furnished+`</p>
	        	 <b>Flooring</b>
	        	 <div id="floor">
	        	 </div>
	        	 <b>Appliances</b>
	        	 <div id="appliances">
	        	 </div>
	        	 <b>Listing Terms</b>
	        	 <div id="listTerms">
	        	 </div>
        	</div>`);

        	//Flooring, Appliances and ListingTerms

        	if(unique.bundle[i].Media != null){
                for (var j=0; j<unique.bundle[i].Media.length;++j){
                    $('#Media'+i).append(
                        `<p>MediaURL `+(j+1)+`: `+unique.bundle[i].Media[j].MediaURL+`</p>`
                    );
                }
            } else {$('#Media'+i).append("<p>Doesn't apply</p>");}

        	if(unique.bundle[i].Flooring != null){
	        	for (var j=0; j<unique.bundle[i].Flooring.length;++j){
	        		$('#floor').append(
	        			`<p>Floor `+(j+1)+`: `+unique.bundle[i].Flooring[j]+`</p>`
	        		);
	        	}
	        } else {$('#floor').append("<p>Doesn't apply</p>");}

	        if(unique.bundle[i].Appliances != null){
	        	for (var j=0; j<unique.bundle[i].Appliances.length;++j){
	        		$('#appliances').append(
	        			`<p>Appliance `+(j+1)+`: `+unique.bundle[i].Appliances[j]+`</p>`
	        		);
	        	}
	        } else {$('#appliances').append("<p>Doesn't apply</p>");}

	        if(unique.bundle[i].ListingTerms != null){
	        	for (var j=0; j<unique.bundle[i].ListingTerms.length;++j){
	        		$('#listTerms').append(
	        			`<p>Term `+(j+1)+`: `+unique.bundle[i].ListingTerms[j]+`</p>`
	        		);
	        	}
	        } else {$('#listTerms').append("<p>Doesn't apply</p>");}
        }
	});
});