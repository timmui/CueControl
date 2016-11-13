var rp = require('request-promise');

function getStocks(callback){
    var options = {
        uri: 'https://www.google.com/',
        method: 'GET',
        }
    console.log('here');

    rp(options).
        then((response) => {
            console.log('here2');
            console.log(response);
        })
        .catch((err) => {
            console.error(err);
        });
}
exports.getStocks = getStocks;
