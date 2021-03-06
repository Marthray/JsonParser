function initAll(){
    var zip = null;
    var propType = null;
    var bathrooms = null;
    var bedrooms = null;
    var rent = null;
    var minP = null;
    var maxP = null;

    cargarCookie();
    parseJson();
}

$(function() { //Esta función hace cosas cuando el html carga
	//obteniendo valores de las cookies
	initAll();
});



function cargarCookie(){
	zip = Cookies.get('zip');
	propType = Cookies.get('type');
	bathrooms = Cookies.get('bathrooms');
	bedrooms = Cookies.get('bedrooms');
    rent = Cookies.get('rent');
	minP = Cookies.get('minPrice');
	maxP = Cookies.get('maxPrice');
}

function getProperty(param){
    if (param=="All"){
        return "";
    } else {
        return ("&PropertySubType[in]="+param);
    }
}

function getURL(){
    if((bathrooms != "0") && (bedrooms != "0") && (minP != "0")) {
        return "https://rets.io/api/v2/test/listings?access_token=7f8afaacb6f6f5cd2c80f3ee8f9bb103&PostalCode[eq]="+zip+getProperty(propType)+"&LeaseConsideredYN[eq]="+rent+"&BathroomsTotalInteger[lte]="+bathrooms+"&BedroomsTotal[lte]="+bedrooms+"&OriginalListPrice[gte]="+minP+"&OriginalListPrice[lte]="+maxP+"&limit=100";
    } else if((bathrooms != "0") && (bedrooms != "0") && (minP == "0")) {
        return "https://rets.io/api/v2/test/listings?access_token=7f8afaacb6f6f5cd2c80f3ee8f9bb103&PostalCode[eq]="+zip+getProperty(propType)+"&LeaseConsideredYN[eq]="+rent+"&BathroomsTotalInteger[lte]="+bathrooms+"&BedroomsTotal[lte]="+bedrooms+"&limit=100";
    } else if((bathrooms != "0") && (bedrooms == "0") && (minP != "0")) {
        return "https://rets.io/api/v2/test/listings?access_token=7f8afaacb6f6f5cd2c80f3ee8f9bb103&PostalCode[eq]="+zip+getProperty(propType)+"&LeaseConsideredYN[eq]="+rent+"&BathroomsTotalInteger[lte]="+bathrooms+"&OriginalListPrice[gte]="+minP+"&OriginalListPrice[lte]="+maxP+"&limit=100";
    } else if((bathrooms != "0") && (bedrooms == "0") && (minP == "0")) {
        return "https://rets.io/api/v2/test/listings?access_token=7f8afaacb6f6f5cd2c80f3ee8f9bb103&PostalCode[eq]="+zip+getProperty(propType)+"&LeaseConsideredYN[eq]="+rent+"&BathroomsTotalInteger[lte]="+bathrooms+"&limit=100";
    } else if((bathrooms == "0") && (bedrooms != "0") && (minP != "0")) {
        return "https://rets.io/api/v2/test/listings?access_token=7f8afaacb6f6f5cd2c80f3ee8f9bb103&PostalCode[eq]="+zip+getProperty(propType)+"&LeaseConsideredYN[eq]="+rent+"&BedroomsTotal[lte]="+bedrooms+"&OriginalListPrice[gte]="+minP+"&OriginalListPrice[lte]="+maxP+"&limit=100";
    } else if((bathrooms == "0") && (bedrooms != "0") && (minP == "0")) {
        return "https://rets.io/api/v2/test/listings?access_token=7f8afaacb6f6f5cd2c80f3ee8f9bb103&PostalCode[eq]="+zip+getProperty(propType)+"&LeaseConsideredYN[eq]="+rent+"&BedroomsTotal[lte]="+bedrooms+"&limit=100";
    } else if((bathrooms == "0") && (bedrooms == "0") && (minP != "0")) {
        return "https://rets.io/api/v2/test/listings?access_token=7f8afaacb6f6f5cd2c80f3ee8f9bb103&PostalCode[eq]="+zip+getProperty(propType)+"&LeaseConsideredYN[eq]="+rent+"&OriginalListPrice[gte]="+minP+"&OriginalListPrice[lte]="+maxP+"&limit=100";
    } else if((bathrooms == "0") && (bedrooms == "0") && (minP == "0")) {
        return "https://rets.io/api/v2/test/listings?access_token=7f8afaacb6f6f5cd2c80f3ee8f9bb103&PostalCode[eq]="+zip+getProperty(propType)+"&LeaseConsideredYN[eq]="+rent+"&limit=100";
    }
}

function parseJson(){

	var jsonRetsLy =  getURL();
    $.getJSON(jsonRetsLy, function (listings) {
    	var cont = 0;
    	var page = 1;
    	var pageLimit = 9;
        if (listings.bundle.length < 1){
            $('#result').append(`
                <p> Sorry, nothing was found with your specifications. <a href="https://soulierproperties.com/">Try again</a></p>
                `);
        } else {
        for (var i=0;i<listings.bundle.length;++i){
            var mediaURL = "";
            if(listings.bundle[i].Media.length>=1){
                mediaURL =listings.bundle[i].Media[0].MediaURL; 
            } else {
                mediaURL="https://cdn.houseplans.com/product/q5qkhirat4bcjrr4rpg9fk3q94/w800x533.jpg?v=8";
            }
        	$('#result').append(`
        	<div class="listing p`+page+`">
                <div class="a-property col-lg-4 col-sm-6">
                    <h2><a href="https://soulierproperties.com/property?id=`+listings.bundle[i].ListingId+`">`+listings.bundle[i].UnparsedAddress+`</a></h2>
                    <div class="image-property">
                        <a href="https://soulierproperties.com/property?id=`+listings.bundle[i].ListingId+`"><img src="`+mediaURL+`" alt="`+listings.bundle[i].UnparsedAddress+`"></a>
                    </div>

                    <div class="list-main-info">
                        <div class="col-xs-6"><p class="property-type-list">`+listings.bundle[i].PropertySubType+`</p></div>
                        <div class="col-xs-2 main-info-list"><p><i class="fa fa-bed text-normal " style="font-size:24px"></i></p><p class="bathrooms-list">`+listings.bundle[i].BathroomsTotalInteger+`</p></div>
                        <div class="col-xs-2 main-info-list"><p><i class="fa fa-bath text-normal " style="font-size:24px"></i></p><p class="bedrooms-list">`+listings.bundle[i].BedroomsTotal+`</p></div>
                        <div class="col-xs-2 main-info-list"><p style="font-size:16px">SQFT</p><p class="sqtl-list">`+listings.bundle[i].LotSizeSquareFeet+`</p></div>
                        <div class="col-xs-6"><a class="btn btn-primary" href="https://soulierproperties.com/property?id=`+listings.bundle[i].ListingId+`">View More</a></div>
                        <div class="col-xs-6"><p class="price-list">$`+accounting.formatNumber(parseInt(listings.bundle[i].OriginalListPrice))+`</p></div>
                    </div>
                    
                </div>
        	</div>`);

            //page number
        	if((i+1) % pageLimit == 0){
        		page++;
        	}
        }
        pagination(page);
	}
	});
}

function pagination(pages){
	$('#paginate').twbsPagination({
        totalPages: pages,
        visiblePages: 5,
        onPageClick: function (event, page) {
            for(var i=0; i<pages; ++i){
            	if(i==(page-1)){
            		$('.p'+(i+1)).removeClass('dNone');
            		$('.p'+(i+1)).addClass('dTrue');
            	} else {
            		$('.p'+(i+1)).removeClass('dTrue');
            		$('.p'+(i+1)).addClass('dNone');
            	}
            }
        }
    });
}