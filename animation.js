const _ = require('lodash');
const config = require('./config');
const sleep = require('sleep');

function output(results, trend, cue, callback) {
    // Animate lighting keys up
    cue.clear();
    // console.log(results);
    if (trend > 0) {
        _.each(config.upArrow, key => {
            cue.set(key, 0, config.green, 0, true);
        });
        _.each(results, (result) => {
            cue.set(result, 0, config.green, 0, true);
            sleep.usleep(75000);
        });
    } else {
         _.each(config.downArrow, key => {
            cue.set(key, config.red, 0, 0, true);
        });
        _.each(results, (result) => {
            cue.set(result, config.red, 0, 0, true);
            sleep.usleep(75000);
        });
    }
    if (callback) {
        return callback();
    }
}
exports.output = output;
