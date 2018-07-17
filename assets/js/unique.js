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
        	$('#test').append(`
        	<div class="listing" style="border: 1px solid;">
                <a href="unique.html?id=`+unique.bundle[i].ListingId+`" target="_blank">ID: `+unique.bundle[i].ListingId+`</a>
	        	<p>Zip: `+unique.bundle[i].PostalCode+`</p>
	        	<p>Bathrooms: `+unique.bundle[i].BathroomsTotalInteger+`</p>
	        	<p>Bedrooms: `+unique.bundle[i].BedroomsTotal+`</p>
	        	<p>Property Type: `+unique.bundle[i].PropertyType+`</p>
	        	<p>Pricing: `+unique.bundle[i].OriginalListPrice+`</p>`+

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