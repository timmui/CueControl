const _ = require('lodash');
const async = require('async');
const config = require('./config');
const CueSDK = require('cue-sdk-node');
const sleep = require('sleep');
const socket = require('socket.io-client')('https://rocky-chamber-37355.herokuapp.com/');


const stocks = require('./stocks');
const animation = require('./animation');

var cue = new CueSDK.CueSDK();
var isChanged = true;

socket.on('connect', function(){
    console.log('Connected');
});
socket.on('event', function(data){
    console.log('got event');
});
socket.on('clear', function(data){
    console.log('clear');
});
socket.on('update', function(data){
    console.log('update');
});
socket.on('disconnect', function(){});

async.waterfall([
    (next) => {
        // Call NASDAQ for prices
        stocks.getStocks('AAPL', next);
    },
    (result, next) => {
        // Identify keys to light up - input Response from NASDAQ 
        stocks.plotResults(result, next);
    },
    (keys, trend, next) => {
        // Light Keys up
        animation.output(keys, trend, next);
    },
],
    (err) => {
        // TODO: Error Check
        while (true) {
            if (isChanged) {
                isChanged = false;
                // cue.clear();

                // for (var i = 0; i <= _.size(config.keymap); i++) {
                //     cue.set(_.values(_.values(config.keymap)[i])[1],
                 //         config.colourRValue + 4 * i, config.colourGValue - 2 * i, config.colourBValue, true);
                //     sleep.usleep(50000);
                // }
            }
        }
    }
);
