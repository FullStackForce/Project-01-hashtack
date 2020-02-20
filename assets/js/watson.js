// var corpus = "";
function getTone() {
  var toneResponse;
  var settings = {
    url:
      "https://api.us-south.tone-analyzer.watson.cloud.ibm.com/instances/631260ac-7831-4df4-abb7-fe1e5cd2eeb0/v3/tone?version=2017-09-21",
    method: "POST",
    timeout: 0,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic YXBpa2V5OlFSTFRCU2hFbmdzUHJsaXhoR0JraHZ2dm1CcmprRmRWY25PWlBtNi03dWNW"
    },
    data: JSON.stringify({ text: corpus })
  };

  $.ajax(settings).done(function(response) {
    // console.log(response);
    toneResponse = response.document_tone.tones;
    console.log(toneResponse);
  });
  console.log(toneResponse);
  return toneResponse;
}
