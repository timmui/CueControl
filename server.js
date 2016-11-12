const CueSDK = require('cue-sdk-node')

var cue = new CueSDK.CueSDK();
var isChanged = true;

while(true){
    if (isChanged){
        isChanged = false;
        cue.clear();
        cue.set('W', 255,255,255);
    }
}
