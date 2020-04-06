// hashtags trending start here
var consumerKey = "yourkeyhere";
var consumerSecret = "yourkeyhere";
var accessToken = "yourkeyhere-YkKR4K5OnTK5b8MseTLGejCaBQshDr7";
var tokenSecret = "yourkeyhere";

function getTwitter(action, woeid, x) {
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
    cache: true
  });
}

function twitterTags(query) {
  var url = "https://api.twitter.com/1.1/search/tweets.json?q=%23" + query + "&count=56&include_entities=true";
  var woeid = 2466256;
  getTwitter(url, woeid, "test");
}
$("button").on("click", function(event) {
	event.preventDefault();
	var value = $("#get-hashtag").val();
	twitterTags(value)
	$("#get-hashtag").val("");
})
  
  var toneResponse;
function getMyDocumentTone(myCorpus, index) {
  // var toneResponse;
  var settings = {
    url:
      "https://api.us-south.tone-analyzer.watson.cloud.ibm.com/instances/631260ac-7831-4df4-abb7-fe1e5cd2eeb0/v3/tone?version=2017-09-21",
    method: "POST",
    timeout: 0,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic YXBpa2V5OlFSTFRCU2hFbmdzUHJsaXhoR0JraHZ2dm1CcmprRmRWY25PWlBtNi03dWNW"
    },
    data: JSON.stringify({ text: myCorpus })
  };

  $.ajax(settings).done(function(response) {
    // console.log(response);
    toneResponse = response.document_tone.tones;
      console.log(toneResponse);
        var toneDiv = $("<div>").addClass("content");
    if (toneResponse.length) {
      toneResponse.forEach(element => {
        toneDiv.append(
          $("<p>").text(
            "Tone: " +
            element.tone_name +
            " Confidence: " +
            element.score * 100
          )
        );
      });
      $("#tweet_" + index+" .card-content").append(toneDiv);
        }
    // console.log(toneResponse);
  });

  return toneResponse;
}

function test(data) {
  $("#cardContainer").empty();
  // var result = data
  console.log(data);
  var tones = [];
  for (let i = 0; i < data.statuses.length; i++) {
    console.log(i);
    var time = data.statuses[i].created_at;
    var newTime = time.substring(0, 11);
    console.log(newTime);
    var hashtags = "";
    if (!data.statuses[i].entities.hashtags.length) {
      hashtags = data.statuses[i].user.name;
    } else {
      hashtags = "#" + data.statuses[i].entities.hashtags[0].text;
    }

    // var media = "";
    // if(!data.statuses[i].entities.media[0].media_url.length) {
    // 	media = "assets/images/hashtag.jpg"
    // } else {
    // 	media = data.statuses[i].entities.media[0].media_url
    // }

    var corpus = data.statuses[i].text;
    tones = getMyDocumentTone(corpus, i);
    console.log(tones);

    var content = `
		        <div class="column is-one-quarter-desktop is-half-tablet">
							<div class="card" id="tweet_${i}">
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
									<div class="content">
								</div>
							</div>
						</div>
		        `;
    $("#cardContainer").append(content);
    // var toneDiv = $("<div>").addClass("content");
    // if (tones.length) {
    //   tones.forEach(element => {
    //     toneDiv.append($("<p>").text("Tone: " + element.tone_name + " Confidence: " + element.score * 100));
    //   });
    //   $("#tweet_${i}").append(toneDiv);
    // }
  }
}

function update(data) {
	$(".hashContainer").empty();
	var result = data[0].trends;
	for(var i = 0; i < result.length; i++) {
		var name = result[i].name;
		var url = result[i].url;
		$(".hashContainer").append('<li><a href="' + url + '" target="_blank"><div>' + name + '</div> </a> </li>');
	}
}
$(window).load(function() {
	var url = "https://api.twitter.com/1.1/trends/place.json";
	var woeid = 2466256;
	getTwitter(url, woeid, "update");
});
