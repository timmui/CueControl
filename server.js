const _ = require('lodash');
const config = require('./config');
const CueSDK = require('cue-sdk-node');
const sleep = require('sleep');

const stocks = require('./stocks');

var cue = new CueSDK.CueSDK();
var isChanged = true;

stocks.getStocks();

while (true) {
    if (isChanged) {
        isChanged = false;
        cue.clear();

        for (var i = 0; i <= _.size(config.keymap); i++) {
            cue.set(_.values(_.values(config.keymap)[i])[1],
                config.colourRValue + 4*i, config.colourGValue - 2*i, config.colourBValue, true);
            sleep.usleep(50000);
        }
    }
}
