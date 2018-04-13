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
