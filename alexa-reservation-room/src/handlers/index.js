'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = undefined;

var SKILL_NAME = "会議室";
var GET_FACT_MESSAGE = "知ってましたか？";
var HELP_MESSAGE = "テスト中です。ヘルプメッセージ";
var HELP_REPROMPT = "どうしますか？";
var STOP_MESSAGE = "さようなら";

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },
    'GetNewFactIntent': function () {
        this.emit(':tellWithCard', "すいません、まだ開発中で、その要望には答えられません。")
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
