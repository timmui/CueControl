var _ = require('lodash');
var keyboardLayout = require('./layout').keyLayout;
var rp = require('request-promise');
var parser = require('xml2json');

function getStocks(symbol, callback) {
    var options = {
        uri: `http://ws.nasdaqdod.com/v1/NASDAQAnalytics.asmx/GetEndOfDayData?_Token=BC2B181CF93B441D8C6342120EB0C971&Symbols=${symbol}&StartDate=${'10/31/2016'}&EndDate=${'11/12/2016'}&MarketCenters=Q`,
        method: 'GET',
    };

    rp(options)
        .then((response) => {
            var res = JSON.parse(parser.toJson(response));
            res = res.ArrayOfEndOfDayPriceCollection.EndOfDayPriceCollection.Prices.EndOfDayPrice;
            // console.log(res);
            if (callback) return callback(null, res);
        })
        .catch((err) => {
            console.error(err);
            if (callback) return callback(err);
        });
}
exports.getStocks = getStocks;

function plotResults(results, callback) {
    var maxPrice = 0;
    var minPrice = Number.MAX_VALUE;
    var prices = _.map(results, (result) => {
        if (result.Close > maxPrice) {
            maxPrice = result.Close;
        }
        if (result.Close < minPrice) {
            minPrice = result.Close;
        }
        return result.Close;
    });
    // console.log(prices);
    // console.log(maxPrice);
    // console.log(minPrice);
    var adjustedPrices = _.map(prices, (price) => {
        return Math.floor((86 * (price - minPrice)) / (maxPrice - minPrice));
    });
    // console.log(adjustedPrices);
    var xScale = 30;

    var keysToLight = [];

    // var moreFuckingPrices = [];

    // _.each(adjustedPrices, (y,x) => {
    //     moreFuckingPrices.push(adjustedPrices[x]);
    //     moreFuckingPrices.push(adjustedPrices[x+1]-adjustedPrices[x]);
    // });

    _.each(adjustedPrices, (y, x) => {
        var keys = [];

        for (var i = Math.floor(x * xScale - 7); i < Math.floor(x * xScale + 7); i++) {
            if (i < 0) i = 0;
            if (i > keyboardLayout.length) i = keyboardLayout.length;
            // console.log(i);
            // console.log(y);
            // console.log(keyboardLayout[i]);
            // console.log(keyboardLayout[i][y]);
            if (keyboardLayout[i][y]) {
                for (var j = y-5; j < y +5 ; j++) {
                    if (j < 0) j = 0;
                    if (j > keyboardLayout.length) j = keyboardLayout.length;
                    keys.push(keyboardLayout[i][j]);
                }
            }
            // console.log(keys);
        }
        keysToLight.push(keys);
    });
    var trend = prices[prices.length-1] - prices[prices.length-2];
    // console.log(keysToLight);
    var uniqKeys = _.uniq(_.flatten(keysToLight));
    // console.log(uniqKeys);
    if (callback) return callback(null, uniqKeys, trend);
}
exports.plotResults = plotResults;
