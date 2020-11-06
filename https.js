/*
 * @Descripttion: 
 * @version: 
 * @Author: ankeji
 * @Date: 2020-07-21 15:30:40
 * @LastEditors: ankeji
 * @LastEditTime: 2020-11-06 15:29:25
 */ 
var https = require("https");

function download(url, callback) {
  https.get(url, function(res) {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on("end", function() {
      callback(data);
    });
  }).on("error", function() {
    callback(null);
  });
}

exports.download = download;