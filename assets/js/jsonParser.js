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

function parseJson(){

	var jsonRetsLy = "https://rets.io/api/v2/test/listings?access_token=7f8afaacb6f6f5cd2c80f3ee8f9bb103&PostalCode[eq]="+zip+"&PropertySubType[in]="+propType+"&LeaseConsideredYN[eq]="+rent+"&BathroomsTotalInteger[lte]="+bathrooms+"&BedroomsTotal[lte]="+bedrooms+"&OriginalListPrice[gte]="+minP+"&OriginalListPrice[lte]="+maxP+"&limit=100";
    $.getJSON(jsonRetsLy, function (listings) {
    	var cont = 0;
    	var page = 1;
    	var pageLimit = 9;
        for (var i=0;i<listings.bundle.length;++i){
        	$('#result').append(`
        	<div class="listing p`+page+`">
                <div class="a-property col-lg-4 col-sm-6">
                    <h2><a href="https://soulierproperties.com/property?id=`+listings.bundle[i].ListingId+`">`+listings.bundle[i].UnparsedAddress+`</a></h2>
                    <div class="image-property">
                        <a href="https://soulierproperties.com/property?id=`+listings.bundle[i].ListingId+`"><img src="`+listings.bundle[i].Media[0].MediaURL+`" alt="`+listings.bundle[i].UnparsedAddress+`"></a>
                    </div>

                    <div class="list-main-info">
                        <div class="col-lg-6"><p class="property-type-list">`+listings.bundle[i].PropertySubType+`</p></div>
                        <div class="col-lg-2 main-info-list"><p><i class="fa fa-bed text-normal " style="font-size:24px"></i></p><p class="bathrooms-list">`+listings.bundle[i].BathroomsTotalInteger+`</p></div>
                        <div class="col-lg-2 main-info-list"><p><i class="fa fa-bath text-normal " style="font-size:24px"></i></p><p class="bedrooms-list">`+listings.bundle[i].BedroomsTotal+`</p></div>
                        <div class="col-lg-2 main-info-list"><p style="font-size:16px">SQFT</p><p class="sqtl-list">`+listings.bundle[i].LotSizeSquareFeet+`</p></div>
                        <div class="col-lg-6"><a class="btn btn-primary" href="https://soulierproperties.com/property?id=`+listings.bundle[i].ListingId+`">View More</a></div>
                        <div class="col-lg-6"><p class="price-list">$`+listings.bundle[i].OriginalListPrice+`</p></div>
                        <p>Rent?: `+listings.bundle[i].LeaseConsideredYN+`</p>
                    </div>
                    
                </div>
        	</div>`);

            //Media appending
            if(listings.bundle[i].Media != null){
                for (var j=0; j<listings.bundle[i].Media.length;++j){
                    $('#Media'+i).append(
                        `<p>MediaURL `+(j+1)+`: `+listings.bundle[i].Media[j].MediaURL+`</p>`
                    );
                }
            } else {$('#Media'+i).append("<p>Doesn't apply</p>");}

            //page number
        	if((i+1) % pageLimit == 0){
        		page++;
        	}
        	cont++
		}
		pagination(page);
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