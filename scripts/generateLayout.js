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

for (var col = 0; col <= maxRight; col++){
    layout.push((new Array(maxBottom + 1)).fill(false));
}

_.each(cue.getLeds(), (key) => {
    var keyBottom = key.top + key.height;
    var keyRight = key.left + key.width;

    // Beyond the keys we want
    if (maxBottom < keyBottom || key.top < minTop){
        return;
    }
 else if (maxRight < keyRight || key.left < minLeft){
        return;
    }

    for ( var col = keyRight; col > key.left; col--){
        for ( var row = key.top; row <= keyBottom; row++ ){
            layout[col][row] = key.ledId;
        }
    }
    return;
});

// Remove falsy values from the columns
layout = layout.slice(minLeft,maxRight);
var cleanLayout = [];
for (var i = 0; i < layout.length; i++){
    cleanLayout.push(layout[i].slice(minTop, maxBottom));
}

for (var i = 0; i < cleanLayout.length; i++) {
    cleanLayout[i].reverse();
}
cleanLayout.reverse();

/*
Use to generate CSV
*/
var out = '';
for ( var col = cleanLayout.length-1; col >= 0; col--){
    for (var row = 0; row < cleanLayout[col].length; row++){
        out += cleanLayout[col][row];
        if (row === cleanLayout[col].length -1){
            out += '\n';
        }
 else {
            out += ',';
        }
    }
}
fs.writeFileSync('./layout.csv', out);

/* 
Use to generate Array
*/
// var out = '[\n';
// for( var col = cleanLayout.length-1; col >= 0; col--){
//     out += '[';
//     for (var row = 0; row < cleanLayout[col].length; row++){
//         out += cleanLayout[col][row];
//         if (row === cleanLayout[col].length -1){
//             out += '],\n'
//         } else {
//             out += ','
//         }
//     }
// }
// out += ']'
// fs.writeFileSync("./layout.out", out);

