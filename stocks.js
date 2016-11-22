const _ = require('lodash');
const config = require('./config');
const keyboardLayout = require('./layout').keyLayout;
const rp = require('request-promise');
const parser = require('xml2json');

function getStocks(token, symbol, startDate, endDate, callback) {
    var options = {
        uri: `http://ws.nasdaqdod.com/v1/NASDAQAnalytics.asmx/GetEndOfDayData?_Token=${token}&Symbols=${symbol}&StartDate=${startDate}&EndDate=${endDate}&MarketCenters= `,
        method: 'GET',
    };

    rp(options)
        .then((response) => {
            var res = JSON.parse(parser.toJson(response));
            res = res.ArrayOfEndOfDayPriceCollection.EndOfDayPriceCollection.Prices.EndOfDayPrice;
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
    var adjustedPrices = _.map(prices, (price) => {
        return Math.floor((86 * (price - minPrice)) / (maxPrice - minPrice));
    });

    var keysToLight = [];
    _.each(adjustedPrices, (y, x) => {
        var keys = [];
        var lowerBound = Math.floor(x * config.xScale - config.xSpan);
        var upperBound = Math.floor(x * config.xScale + config.xSpan);

        for (var i = lowerBound; i < upperBound; i++) {
            if (i < 0) {
                i = 0;
            }
            if (i > keyboardLayout.length) {
                i = keyboardLayout.length;
            }
            if (keyboardLayout[i][y]) {
                for (var j = y - config.ySpan; j < y + config.ySpan; j++) {
                    if (j < 0) j = 0;
                    if (j > keyboardLayout.length) j = keyboardLayout.length;
                    keys.push(keyboardLayout[i][j]);
                }
            }
        }
        keysToLight.push(keys);
    });
    var trend = prices[prices.length - 1] - prices[prices.length - 2];
    var uniqKeys = _.uniq(_.flatten(keysToLight));
    
    if (callback) return callback(null, uniqKeys, trend);
}
exports.plotResults = plotResults;
