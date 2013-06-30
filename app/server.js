var fs = require('fs');
var host = '127.0.0.1';
var port = 1337;
var http = require('http');
var express = require('express');
var requestHelper = require('request');
var dota2HistoryApi = 'https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/';
var dota2MatchApi = 'https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/';

var app = express();
app.use(app.router); //use both root and other routes below
app.use(express.static(__dirname)); //use static files in ROOT/public folder

// app.get('/', function(request, response){ //root dir
//     response.send('Hello!!');
// });

function sendApiRequest (url, request, response) {
    requestHelper({
        uri: url,
        qs: request.query
    }, function(error, res, body){
        if (!error && res.statusCode == 200) {
            console.log(body);
            console.log(request.query);
            response.send(body);
        }
    });
}

app.get('/matchhistory', function(request, response){
    sendApiRequest(dota2HistoryApi, request, response);
});

app.get('/matchdetails', function(request, response){
    sendApiRequest(dota2MatchApi, request, response);
});

console.log('Starting server on port: ' + port);
app.listen(port, host);
console.log('Server started and running on: ' + host + ':' + port);