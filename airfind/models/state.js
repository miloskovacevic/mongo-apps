var mongoose = require('mongoose');

var stateSchema = mongoose.Schema({
    name: {
        type: String
    },

    code: {
        type: String
    },

    loc: {
        type: {
            type: String
        },
        coordinates: {
            type: Array
        }
    }
});

var State = module.exports = mongoose.model('State', stateSchema);

//Functions for interacting with "state" collection in MongoDB

//ako ovo ne radi, vrati se i ubaci ovo zakomentarisano
//Airport.findOne(id, callback).limit(limit).sort([['']]);

module.exports.getStates = function (callback, limit) {
    State.find(callback);
    //Airport.find(callback);

}



