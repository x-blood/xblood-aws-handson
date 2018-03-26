"use strict";
const Alexa = require('alexa-sdk'); // Alexa SDKの読み込み
exports.handler = function(event, context, callback) {

var alexa = Alexa.handler(event, context);

    // Alexa SDKの処理
    alexa.appId = process.env.APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();

    // ハンドラの定義
    var handlers = {
       'WeatherIntent': function () {
            var city = this.event.request.intent.slots.City.value;
            var weather = weatherFunc(city);
            this.emit(':tell', '本日の' + city + 'の天気は' + weather + 'です');
    },
    'LaunchRequest': function () {...},
    'AMAZON.HelpIntent': function () {...},
    'AMAZON.StopIntent': function () {...},
    'SessionEndedRequest ': function () {...}
};
