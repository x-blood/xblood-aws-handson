'use strict';
var Alexa = require('alexa-sdk');
// var RestClient = require('node-rest-client').Client;
// var request = require('request');
var http = require('http');

var APP_ID = undefined;

var SKILL_NAME = "会議室";
var GET_FACT_MESSAGE = "知ってましたか？";
var HELP_MESSAGE = "テスト中です。ヘルプメッセージ";
var HELP_REPROMPT = "どうしますか？";
var STOP_MESSAGE = "さようなら";

var ENDPOINT_BASE = 'https://outlook.office.com/api/v2.0/';
// var outlookRestClient = new RestClient();

exports.handler = function(event, context, callback) {

    console.log('start handler')
    http.get("http://www.google.com/index.html", function(res) {
            console.log("Got response: " + res.statusCode);

            res.on("data", function(chunk) {
                console.log('data : ' + chunk);
            });
    }).on('error', function(e) {
        console.log('error : ' + e);
    });

    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
    console.log('end handler')
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },
    'GetNewFactIntent': function () {
        console.log('Start GetNewFactIntent');

        // var client = new RestClient();


        var result;
        // For Test
        // result = client.get(ENDPOINT_BASE + 'me/events', function(error){
        //     console.log(error);
        // });
        // console.log(result);

        // request.get({
        //    uri: 'https://www.google.co.jp',
        //    headers: {'Content-type': 'text/html'}
        // }, function(err, req, data) {
        //     console.log(err);
        // });

        http.get("http://www.google.com/index.html", function(res) {
            console.log("Got response: " + res.statusCode);

            res.on("data", function(chunk) {
                console.log('data : ' + chunk);
            });
        }).on('error', function(e) {
            console.log('error : ' + e);
        });

        this.emit(':tellWithCard', "2");
        console.log('End GetNewFactIntent')
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = HELP_MESSAGE;
        var reprompt = HELP_REPROMPT;
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    }
};
