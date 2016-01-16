var express = require('express');
var router = express.Router();

var Invoice = require('../models/invoice.js');

//GET all invoices
router.get('/', function (req, res) {
    Invoice.getInvoices(function (err, data) {
        if(err){
            res.send(err);
        }
        res.send(data);
    }, 10);
});

//GET Single invoice
router.get('/:id', function (req, res) {
    Invoice.getInvoiceById(req.params.id, function (err, invoice) {
        if(err){
            res.send(err);
        }
        res.send(invoice);
    })
});

module.exports = router;