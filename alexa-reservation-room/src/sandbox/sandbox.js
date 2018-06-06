var http = require('http');


console.log('Started sandbox.js');

// testHttp();
// hoge1();
// requestFunction(function requestCallback(err) {
//     // If error occurs during http.get request - respond with console.log
//     if (err) {
//         console.log('HTTP Error: request not sent');
//     }
//     // ContinueIntent(session,response);
// });

console.log('Finished sandbox.js');

/*
  関数の宣言1：変数化なし
 */
function hoge1(){
  var huga = 1;
  console.log('hoge1 : ' + huga);
}

/*
  関数の宣言2：変数化あり
 */
var hoge2 = function(){
  var huga = 1;
  console.log('hoge2 : ' + huga);
}

/*
  httpモジュールの動作確認用処理その1
  googleのページをGETしてみる。
 */
function testHttp() {
  http.get("http://www.google.com", function(res) {
    console.log("Got response: " + res.statusCode);

    // res.on("data", function(chunk) {
    //   console.log('data : ' + chunk);
    // });

  }).on('error', function(e) {
      console.log('error : ' + e);
  });
}

/*
  httpモジュールの動作確認用処理その2
  引数として必ずcallback処理を渡さないといけない
 */
function requestFunction(requestCallback){
    var url = "http://www.google.com";

    http.get(url, function(res) {
        console.log("Got response: " + res.statusCode);
        requestCallback(null);
    }).on('error', function (e) {
        console.log("Got error: ", e);
    });
}