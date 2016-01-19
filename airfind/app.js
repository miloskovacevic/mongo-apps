var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var express_geocoding_api = require('express-geocoding-api');
var mongoose = require('mongoose');

Airport = require('./models/airport.js');
State = require('./models/state.js');

app.use(express_geocoding_api({
    geocoder: {
        provider: 'google'
    }
}));

mongoose.connect('mongodb://localhost/airfind');
var db = mongoose.connection;

app.use(express.static(__dirname + '/client'))
app.use(bodyParser.json());


app.get('/api', function (req, res) {
    res.send('Koristite /api/airports or /api/states tacke');
});

app.get('/api/airports', function (req, res) {
    Airport.getAirports(function (err, data) {
        if(err){
            res.send(err);
        }
        res.json(data);
    }, 10)
});

app.post('/api/airports/prox', function (req, res) {
    var location = req.body;
    Airport.getAirportsByProximity(location, function (err, data) {
        if(err){
            res.send(err);
        }
        res.json(data);
    }, 10)
});

app.get('/api/states', function (req, res) {
    State.getStates(function (err, data) {
        if(err){
            res.send(err);
        }
        res.json(data);
    }, 10)
});

app.get('/api/airports/state/:state', function (req, res) {
    Airport.getAirportsByState(req.params.state, function (err, data) {
        if(err){
            res.send(err);
        }
        res.json(data);
    }, 10)
});


app.listen(3000, function () {
    console.log('Server listening on port 3000...');
})
