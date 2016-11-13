const _ = require('lodash');
const config = require('./config');
const CueSDK = require('cue-sdk-node');
const sleep = require('sleep');

function output(results, trend, cue, callback) {
    // Animate lighting keys up
    cue.clear();
    // console.log(results);
    if (trend > 0) {
        cue.set([
            ['Keypad8', config.colourRValue, config.colourGValue, config.colourBValue],
            ['Keypad4', config.colourRValue, config.colourGValue, config.colourBValue],
            ['Keypad5', config.colourRValue, config.colourGValue, config.colourBValue],
            ['Keypad6', config.colourRValue, config.colourGValue, config.colourBValue]]);
        _.each(results, (result) => {
            cue.set(result, config.colourRValue, config.colourGValue, config.colourBValue, true);
            sleep.usleep(75000);
        });
    } else {
        cue.set([
            ['Keypad2', config.colourGValue, config.colourRValue, config.colourBValue],
            ['Keypad4', config.colourGValue, config.colourRValue, config.colourBValue],
            ['Keypad5', config.colourGValue, config.colourRValue, config.colourBValue],
            ['Keypad6', config.colourGValue, config.colourRValue, config.colourBValue]]);
        _.each(results, (result) => {
            cue.set(result, config.colourGValue, config.colourRValue, config.colourBValue, true);
            sleep.usleep(75000);
        });
    }
    if (callback) {
        return callback();
    }
}
exports.output = output;
