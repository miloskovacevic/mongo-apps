var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//rute
var customers = require('./routes/customers');
var invoices = require('./routes/invoices');

// Monogoose Connect - baza
mongoose.connect('mongodb://localhost/invoicr');
var db = mongoose.connection;

//middleware
app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.send('Please use /api/customers or /api/invoices');
});

app.use('/api/customers', customers);
app.use('/api/invoices', invoices);

app.listen(3000, function () {
    console.log('server listenning on port 3000...');
});

