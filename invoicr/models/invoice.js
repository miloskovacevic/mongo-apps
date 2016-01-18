var mongoose = require('mongoose');

// Invoice schema
var invoiceSchema = mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    service: {
        type: String,
        required: true
    },
    price: {
        type: String
    },
    due: {
        type: String
    },
    status: {
        type: String
    },
    createdAt: {
        type: Date,
        default:  Date.now
    }
});

var Invoice = module.exports = mongoose.model('Invoice', invoiceSchema);

//Functions

//get invoices
module.exports.getInvoices = function (callback, limit) {
    Invoice.find(callback).limit(limit).populate('customer').sort([['createdAt','descending']]);
}

module.exports.getInvoiceById = function (id, cb) {
    Invoice.findById(id, cb);
}

module.exports.addInvoice = function (invoice, callback) {
    var add = {
        "customer": invoice.customer_id,
        "service": invoice.service,
        "price": invoice.price,
        "due": invoice.due,
        "status": invoice.status
    };
    Invoice.create(add, callback);
}

module.exports.updateInvoice = function (id, invoice, options, callback) {
    var query = {_id: id};
    var update = {
        "service": invoice.service,
        "price": invoice.price,
        "due": invoice.due,
        "status": invoice.status
    };
    Invoice.findOneAndUpdate(query, update, options, callback);
}

module.exports.deleteInvoice = function (id, callback) {
    var query = {_id: id};
    Invoice.remove(query, callback);
}




