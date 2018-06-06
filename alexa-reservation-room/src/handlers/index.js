'use strict';
var Alexa = require('alexa-sdk');
// var RestClient = require('node-rest-client').Client;
// var request = require('request');
var http = require('http');
var https = require('https');

// var APP_ID = undefined;

var SKILL_NAME = "会議室";
var GET_FACT_MESSAGE = "知ってましたか？";
var HELP_MESSAGE = "テスト中です。ヘルプメッセージ";
var HELP_REPROMPT = "どうしますか？";
var STOP_MESSAGE = "さようなら";

var ENDPOINT_BASE = 'https://outlook.office.com/api/v2.0/';
var ENDPOINT_BASE2= 'https://www.google.co.jp/';
// var outlookRestClient = new RestClient();

exports.handler = function(event, context, callback) {
    console.log('start handler');
    var alexa = Alexa.handler(event, context);
    // alexa.APP_ID = APP_ID;
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
        var self = this;
        var url = ENDPOINT_BASE + "me/calendarview?startDateTime=2018-06-01T01:00:00&endDateTime=2018-06-30T23:00:00&$select=Subject";
        // var url = "https://www.google.co.jp/";
        // https.Client
        https.get(url, function(res) {

            var body = '';
            var statusCode = res.statusCode;
            res.on('data', function(chunk) {
                body += chunk;
            });

            console.log('Response Body : ' + body);

            res.on('end', function(res) {
                self.emit(':tellWithCard', statusCode);
            });
        }).on('error', function(e) {
            self.emit(':tellWithCard', "通信に問題が発生しました")
        });
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
    },
    'Unhandled': function () {
        this.emit(':tell', 'こんにちは');
    }
};
