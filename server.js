const _ = require('lodash');
const config = require('./config');
const CueSDK = require('cue-sdk-node');
const sleep = require('sleep');

var cue = new CueSDK.CueSDK();
var isChanged = true;

while (true) {
    if (isChanged) {
        // isChanged = false;
        cue.clear();

        // var keys = cue.getLeds();

        // _.forEach(config.keymap, (key) => {

        // })
        // _.forEach(keys, (key) => {
        //     if (key.ledId )
        //     cue.set(key.ledId, config.colourRValue, config.colourGValue, config.colourBValue, true);
        //     sleep.usleep(50000);
        //     console.log(key.ledId);
        // })

        for (var i = 0; i <= _.size(config.keymap); i++) {
            cue.set(_.values(_.values(config.keymap)[i])[1],
                config.colourRValue + 4*i, config.colourGValue - 2*i, config.colourBValue, true);
            sleep.usleep(50000);
            console.log(i);
        }
        cue.clear();
    }
}
