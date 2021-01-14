var configuration = require("./constants.js");
var url = configuration.mongodb_conn_url;
var MongoClient = require( 'mongodb' ).MongoClient;
var ObjectID = require('mongodb').ObjectID;
var _db;
module.exports = {
  connectToServer: function( callback ) {
    MongoClient.connect( url,{useUnifiedTopology: true}, function( err, db ) {
      _db = db;
      return callback( err );
    } );
  },
  getDb: function() {
    return _db;
  }
};

module.exports.ObjectID = ObjectID;
