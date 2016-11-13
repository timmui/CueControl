const _ = require('lodash');
const CueSDK = require('cue-sdk-node');
const fs = require('fs');


var cue = new CueSDK.CueSDK();

// Set display area bounds
var minLeft = 6;
var minTop = 29;
var maxBottom = 139;
var maxRight = 284;

// Init Layout array
var layout = [];

for(var row = 0; row <= maxBottom; row++){
    layout.push((new Array(maxRight + 1)).fill(false));
}

_.each(cue.getLeds(), (key) => {
    // Beyond the keys we want
    var keyBottom = key.top + key.height;
    var keyRight = key.left + key.width;
    if (maxBottom < keyBottom || key.top < minTop){
        return;
    } else if (maxRight < keyRight || key.left < minLeft){
        return;
    } 

    for( var row = key.top; row <= keyBottom; row++ ){
        for( var col = key.left; col < keyRight; col++){
            layout[row][col] = key.ledId;
        }
    }
    return;
});

var cleanLayout = [];
for(var i = 0; i < layout.length; i++){
    if (_.isNumber(layout[i][7])){
        cleanLayout.push(layout[i]);
    }
}

var out  = '[';

for(var r = 0; r < cleanLayout.length; r++){
    out += '[';
    for(var c = 0; c < cleanLayout[r].length; c++) { 
        out += cleanLayout[r][c] + (c === cleanLayout[r].length-1 ? '' :',');
    }
    out += ']' + (r === cleanLayout.length-1 ? '\n' :',\n');
}

out += ']';

fs.writeFileSync("./layout.out", out);
