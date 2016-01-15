var express = require('express');
var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');


//middleware
app.use(bodyParser.json());

var db = mongojs('catalog', ['products']);

app.get('/', function (req, res) {
    res.send('It works');
});

app.get('/products', function (req, res) {
    console.log('Fetching Products ...');
    db.products.find(function (err, docs) {
        if(err) {
            res.send(err);
        } else{
            console.log('Sending Products...');
            res.json(docs);
        }
    });
});

app.post('/products', function (req, res) {
   db.products.insert(req.body, function (err, doc) {
       if(err){
           res.render(err);
       } else {
           console.log('Adding product...');
           res.json(doc);
       }
   }); 
});

app.put('/products/:id', function (req, res) {
    db.products.findAndModify({query: {_id: mongojs.ObjectId(req.params.id)},
        update:{$set: {
            name: req.body.name,
            category: req.body.category,
            description: req.body.description
        }},
        new: true
    }, function (err, doc) {
        if(err){
            res.render(err);
        } else {
            console.log('Updating Product...');
            res.json(doc);
        }
    });
});

app.get('/products/:id', function (req, res) {
    console.log('Fetching Product ...');
    db.products.findOne({_id: mongojs.ObjectId(req.params.id)},function (err, doc) {
        if(err) {
            res.send(err);
        } else{
            console.log('Sending Product...');
            res.json(doc);
        }
    });
});

app.delete('/products/:id', function (req, res) {
    console.log('Fetching Product ...');
    db.products.remove({_id: mongojs.ObjectId(req.params.id)},function (err, doc) {
        if(err) {
            res.send(err);
        } else{
            console.log('Removing Product...');
            res.json(doc);
        }
    });
});


app.listen(3000, function () {
    console.log('Server listening on port 3000...');
})