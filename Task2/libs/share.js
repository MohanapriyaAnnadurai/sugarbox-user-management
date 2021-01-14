var express = require("express");
var config = require("../config/constants.js");
mongoUtil = require('../config/mongoUtil.js');
var MongoDB = require('mongodb');
app = express();
var router = express.Router(); 
app.use('/api', router);
cookieParser = require('cookie-parser');
bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json());
session = require('express-session');
app.use(cookieParser());
app.use(session({ secret: config.session_secret,
    duration: 60 * 60 * 1000,
    activeDuration: 60 * 60 * 1000,
    httpOnly: true,
    resave: true,
    maxAge: 1000 * 60 * 3,
    saveUninitialized: false,
    name: "SUGARBOXNETWORKPLATFORMSESSIONTASK2"
}));
http = require('http').Server(app);
var Q = require("q");
app.use(function (err, req, res, next) {
  res.send({error: err });
});


var addData = function (data) {
    var defer = Q.defer();
    var db = mongoUtil.getDb().db(config.db_name);
    const myObject = mongoUtil.ObjectID;
    const object = new myObject();
    const timestamp = new MongoDB.Timestamp(0, Math.floor(new Date().getTime() / 1000));
    db.collection('task_2').insertOne({
        string_val:data.name,
        created_at:localIST(),
        time_val: timestamp,
        serial_no:data.serial_no, 
        decimal_val:data.decimal_val,
        object_val:data.object_val,
        array_val:data.array_val,
        boolean_val:data.boolean_val,
        null_type:null,
        float_val:data.float_val,
        undefined_val:undefined,
        regx_expr:/%Test/
        });
    defer.resolve(1);  
    return defer.promise;
}

var viewData = function (id){
    var dfd = Q.defer();
    var db = mongoUtil.getDb().db(config.db_name);
    var uid=mongoUtil.ObjectID(id);
    var collection = db.collection('task_2').find({_id:uid});
    collection.toArray(function (err, result) {
        if(err){ 
            dfd.reject(err);
            return console.error(err); 
        }else{
            dfd.resolve(result);
       }
    });
    return dfd.promise;
}

function localIST(){
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0,-1);
    var current_date=new Date(localISOTime);
    return current_date;
}

module.exports.viewData=viewData;
module.exports.addData=addData;
module.exports.localIST=localIST;