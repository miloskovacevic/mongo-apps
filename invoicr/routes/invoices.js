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

router.post('/', function (req, res) {
    var invoice = req.body;
    Invoice.addInvoice(invoice, function(err, inv){
        if(err){
            res.send(err);
        }
        res.json(inv);
    });
});

router.put('/:id', function(req, res){
    var id = req.params.id;
    var invoice = req.body;

    Invoice.updateInvoice(id, invoice, {}, function (err, rezultat) {
        if(err){
            res.send(err);
        }
        res.json(rezultat);
    })
});

router.delete('/:id', function (req, res) {
    var id = req.params.id;

    Invoice.deleteInvoice(id, function (err, rezultat) {
        if(err){
            res.send(err);
        }
        res.json(rezultat);
    })
});

module.exports = router;