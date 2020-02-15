// hashtags trending start here

var consumerKey    = "";
var consumerSecret = "";
var accessToken    = "";
var tokenSecret    = "";

function getTwitter(action, woeid, x)   {

	var accessor = {
		consumerSecret: consumerSecret,
		tokenSecret: tokenSecret
	};

	var message = {
		method: "GET",
		action: action,
		parameters: {
			oauth_version: "1.0",
			oauth_signature_method: "HMAC-SHA1",
			oauth_consumer_key: consumerKey,
			oauth_token: accessToken,
			id: woeid,
			callback: x
		}
	};

	OAuth.setTimestampAndNonce(message);
	OAuth.SignatureMethod.sign(message, accessor);
	var url = OAuth.addToURL(message.action, message.parameters);

	$.ajax({
		type: message.method,
		url: url,
		dataType: "jsonp",
		jsonp: false,
		cache: true,
	});
}

function twitterTags(query){
	var url = "https://api.twitter.com/1.1/search/tweets.json?q="+query;
	var woeid = 2466256;
	getTwitter(url, woeid, "test");
};

$("button").on("click", function (event) {
	event.preventDefault();
	var value = $("#get-hashtag").val();
	twitterTags(value)


})




function test(data){
	$("#cardContainer").empty();
	// var result = data
	console.log(data);

				for (let i = 0; i < data.statuses.length; i++) {
		        console.log(i);
		        var time = data.statuses[i].created_at;
		        var newTime = time.substring(0,11)
				console.log(newTime)
				var hashtags = "";
				if (!data.statuses[i].entities.hashtags.length){
					hashtags = data.statuses[i].user.name
				} else {
					hashtags = "#"+data.statuses[i].entities.hashtags[0].text
				}
				
		        var content=`
		        <div class="column is-one-quarter-desktop is-half-tablet">
							<div class="card">
								<div class="card-image">
									<figure class="image is-3by2"> <img src=assets/images/hashtag.jpg alt="Placeholder image"> </figure>
								</div>
								<div class="card-content">
									<div class="media">
										<div class="media-content">
											<p class="title is-4 has-text-centered">${hashtags}</p>
										</div>
									</div>
									<div class="content"> ${data.statuses[i].text} 
										<br>
										<time datetime="2016-1-1"> ${newTime} </time>
									</div>
								</div>
							</div>
						</div>
		        `
		        $("#cardContainer").append(content);
		
		        }
	            
	// for( var i = 0; i < result.length; i++ ) {
	// 	var name = result[i].name;
	// 	var url = result[i].url;                  

    }


function update(data){
	$(".hashContainer").empty();
	var result = data[0].trends;              
	for( var i = 0; i < result.length; i++ ) {
		var name = result[i].name;
		var url = result[i].url;                  

		$(".hashContainer").append('<li><a href="#" target="_blank"> <div>' + name + '</div> </a> </li>');
	}
}

$(window).load(function(){
	var url = "https://api.twitter.com/1.1/trends/place.json";
	var woeid = 2466256;
	getTwitter(url, woeid, "update");
});