var express = require('express');
var router = express.Router();

Customer = require('../models/customer.js');
Invoice = require('../models/invoice.js');

//GET all customers
router.get('/', function (req, res) {
    Customer.getCustomers(function (err, customers) {
        if(err){
            res.send(err);
        }
        res.json(customers);
    }, 10);
});

//POST
router.post('/', function (req, res) {
    var customer = req.body;

    Customer.addCustomer(customer, function (err, customer) {
        if(err) {
            res.send(err);
        }
        res.json(customer);
    })
});

//GET single customer
router.get('/:id', function (req, res) {
    Customer.getCustomerById(req.params.id, function (err, customer) {
        if(err) {
            res.send(err);
        }
        res.send(customer);
    })
});

router.put('/:id', function (req, res) {
   var id = req.params.id;
   var customer = req.body;
    Customer.updateCustomer(id, customer, {}, function (err, customer) {
       if(err) {
           res.send(err);
       }
        res.json(customer);
    });
});


router.delete('/:id', function (req, res) {
    var id = req.params.id;

    Customer.deleteCustomer(id, function (err, rezultat) {
        if(err) {
            res.send(err);
        }
        res.json(rezultat);
    })
});

module.exports = router;