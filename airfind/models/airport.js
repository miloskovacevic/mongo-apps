var mongoose = require('mongoose');
State = require('./state.js');

var airportSchema = mongoose.Schema({
    //loc: {
    //    type: {
    //        type: String
    //    },
    //    coordinates: {
    //        type: Array
    //    },
    //    name: {
    //        type: String
    //    },
    //    code: {
    //        type: String
    //    },
    //    createdAt: {
    //        type: Date,
    //        default: Date.now
    //    }
    //}
    loc: {
        type: {
            type: String
        },
        coordinates: {
            type: Array
        }
    },

    name: {
      type: String
    },

    code: {
        type: String
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String
    }
});

var Airport = module.exports = mongoose.model('Airport', airportSchema);

//Functions for interacting with "airport" collection in MongoDB

//ako ovo ne radi, vrati se i ubaci ovo zakomentarisano
//Airport.findOne(id, callback).limit(limit).sort([['']]);

module.exports.getAirports = function (callback, limit) {
    Airport.find(callback);
    //Airport.find(callback);
}

//get airports by state
module.exports.getAirportsByState = function (stateCode, callback, limit) {
    State.findOne({code: stateCode}, function (err, state) {
        var state = state;

        Airport.find({
            loc: {
                $geoWithin: {
                    $geometry: state.loc
                }
            }
        },
        {
            name: 1,
            type: 1,
            code: 1,
            _id: 0
        }, callback).limit().sort([['name', 'ascending']]);
    });
}

// GET NEAREST AIRPORTS... PROXIMITY
module.exports.getAirportsByProximity = function (location, callback, limit) {
    Airport.find({
        loc: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [location.lon, location.lat]
                },
                $maxDistance: location.distance * 1000
            }
        }
    },
    {
        name: 1,
        code: 1,
        _id: 0
    }, callback).limit();
}



