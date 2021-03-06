var request = require('request'),
    cheerio = require('cheerio');
//var player = '12710197';
//var bucket = '2600';
var async = require('async');



var getWin = function(player, bucket, WLD, callback) {
    'use strict';
    var test = null;

    var requestURL = 'http://www.uschess.org/datapage/gamestats.php?memid=' + player + '&dkey='+bucket+'&drill=G';
    request(requestURL, function(error, response, body) {
        var LW = [];
        var $ = cheerio.load(body);
        var $table = $('.blog').siblings().find('tr');
        var tableLength = $table.length;
        $table.each(function(i, element) {
            var $row = $(element);
            var wl = $row.find('td').eq(7).text();
            var pID = $row.find('td').eq(4).text();
            var player = {};
            player.winLoss = wl;
            player.playerID = pID.trim();

            if (WLD === wl) {
                LW.push(player)
            } else if (WLD === null && wl !== '') { // Make sure no empty objects are added
                LW.push(player)
            }
        });
        callback(LW)
    }); 
};

module.exports = getWin;