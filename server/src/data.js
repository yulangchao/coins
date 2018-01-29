'use strict';
var request = require('request');

var firebase = require("firebase");
var config = {
    apiKey: "AIzaSyDbahswBhyoFmIfwtppEBAdEbGoXOZislc",
    authDomain: "myapp-ac3f0.firebaseapp.com",
    databaseURL: "https://myapp-ac3f0.firebaseio.com",
    storageBucket: "myapp-ac3f0.appspot.com",
  };

firebase.initializeApp(config);

var database = firebase.database();
var array = ["ETH-BTC","AIB-BTC","LTC-BTC","USD-BTC"]
exports.put = function () {
  setInterval(function(){ 
    request({
        method: 'GET',
        uri: 'https://c-cex.com/t/api_pub.html?a=getmarketsummaries',
      }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          body = JSON.parse(body);
          var results = body.result.filter(item => array.indexOf(item.MarketName)>-1);
          console.log(results);
          for (let result of results){
            database.ref(result.MarketName).push(result);
          }
        //   
        }else{
          console.log(error);
        }
      })
  }, 60000); 

};
