const _ = require('lodash');
const async = require('async');
const config = require('./config');
const CueSDK = require('cue-sdk-node');
const sleep = require('sleep');
const socket = require('socket.io-client')('https://rocky-chamber-37355.herokuapp.com/');


const stocks = require('./stocks');
const animation = require('./animation');

var cue;
var isChanged = true;

socket.on('connect', function () {
    console.log('Connected');
});
socket.on('event', function (data) {
    console.log('got event');
});
socket.on('clear', function (data) {
    console.log('clear');
    if (cue) {
        cue.clear();
        cue.close();
    }
});
socket.on('update', function (data) {
    console.log('update', data);
    update(data);
});
socket.on('disconnect', function () { });

function update(symbol) {
    cue = new CueSDK.CueSDK();
    async.waterfall([
        (next) => {
            // Call NASDAQ for prices
            stocks.getStocks(symbol, next);
        },
        (result, next) => {
            // Identify keys to light up - input Response from NASDAQ 
            stocks.plotResults(result, next);
        },
        (keys, trend, next) => {
            // Light Keys up
            animation.output(keys, trend, cue, next);
        },
    ],
        (err) => {
            // TODO: Error Check
            console.log("job's done");
        }
    );

}
