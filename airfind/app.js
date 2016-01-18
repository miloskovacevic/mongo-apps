var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var express_geocoding_api = require('express-geocoding-api');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/airfind');
var db = mongoose.connection;

app.use(express.static(__dirname + '/client'))
app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.send('Koristite /api/airports or /api/states tacke');
});

app.listen(3000, function () {
    console.log('Server listening on port 3000...');
})
