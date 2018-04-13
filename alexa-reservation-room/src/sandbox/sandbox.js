var http = require('http');

console.log('Hello node.js!');

// http test
http.get("http://www.google.com", function(res) {
  console.log("Got response: " + res.statusCode);

  res.on("data", function(chunk) {
    console.log('data : ' + chunk);
  });
}).on('error', function(e) {
    console.log('error : ' + e);
});

requestFunction(function requestCallback(err) {
  // If error occurs during http.get request - respond with console.log
  if (err) {
    console.log('HTTP Error: request not sent');
  }
  // ContinueIntent(session,response);
});

function requestFunction(requestCallback){
  var url = "http://www.google.com";

  http.get(url, function(res) {
    console.log("Got response: " + res.statusCode);
    requestCallback(null);
  }).on('error', function (e) {
    console.log("Got error: ", e);
  });
}
