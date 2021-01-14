var express = require("express");
var config = require("../config/constants.js");
mongoUtil = require('../config/mongoUtil.js');
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
    name: "SUGARBOXNETWORKPLATFORMSESSION"
}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', config.angular_app_url);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});
http = require('http').Server(app);
var Q = require("q");
bcrypt = require("bcryptjs");
salt = bcrypt.genSaltSync(10);
app.use(function (err, req, res, next) {
  res.send({error: err });
});


var insertUser = function (data) {
    var defer = Q.defer();
    var db = mongoUtil.getDb().db(config.db_name);
    var passwordHash = bcrypt.hashSync(data.password, salt);
    if('api_key' in data){
        if(data.api_key !="" && data.api_key !=null && data.api_key !="undefined"){
            db.collection('users_task_3').insertOne({name:data.name, password:passwordHash, email:data.add_email,status:1,created_at:localIST()});
            defer.resolve(1);  
           
        }else{
            defer.resolve(0);
        }         
    }else{
        defer.resolve(0);
    }      
    return defer.promise;
}
var addTask = function (user_id,task_arr) {
    var defer = Q.defer();
    var db = mongoUtil.getDb().db(config.db_name);
    if(user_id !="" && user_id !=null && user_id !="undefined"){
        db.collection('task_mapping').update({user_id:user_id}, {$set: {status: 0, deleted_at: localIST()}});
        var task_query=[];
        task_arr.forEach((task_id)=>{
            task_query.push({task_id:task_id, user_id:user_id, status:1,created_at:localIST()});
        });
        db.collection('task_mapping').insertMany(task_arr);
        defer.resolve(1);  
    }else{
        defer.resolve(0);
    }              
    return defer.promise;
}

var deleteUser = function (id) {
    var dfd = Q.defer();
    var db = mongoUtil.getDb().db(config.db_name);
    var user_id=mongoUtil.ObjectID(id);
    db.collection('users_task_3').updateOne({_id:user_id}, {$set: {status: 0, deleted_at: localIST()}},function (err, result){
        if(err){ 
            dfd.reject(err);
            return console.error(err); 
        }else{
            dfd.resolve(user_id);
       }
    });
    return dfd.promise;
}

var checkLogin = function (username,password){
    var dfd = Q.defer();
    var db = mongoUtil.getDb().db(config.db_name);
    db.collection('users_task_3').find({email: username, status: 1}).toArray(function (err, result) {
        if (err) {
            dfd.reject(err);
            return console.error(err); 
        } else if (result.length) {
            var check = bcrypt.compareSync(password, result[0].password);
            if (check == true) {
                var result = result[0];
                var response={success:1,data:result};
                dfd.resolve(response);
            } else {
                var response={success:0};
                dfd.resolve(response);
            }
        } else {
            var response={success:0}
            dfd.resolve(response);
        }
    });
    return dfd.promise;
}

var viewUser = function (id){
    var dfd = Q.defer();
    var db = mongoUtil.getDb().db(config.db_name);
    var user_id=mongoUtil.ObjectID(id);
    var collection = db.collection('users_task_3').find({_id:user_id,status:1});
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
var allUsers = function (id){
    var dfd = Q.defer();
    var db = mongoUtil.getDb().db(config.db_name);
    var collection = db.collection('users_task_3').find();
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

var checkNewUser = function (name){
    var dfd = Q.defer();
    var db = mongoUtil.getDb().db(config.db_name);
    var collection=db.collection('users_task_3').find({email:name,status:1});
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
module.exports.checkLogin=checkLogin;
module.exports.addTask=addTask;
module.exports.viewUser=viewUser;
module.exports.deleteUser=deleteUser;
module.exports.insertUser=insertUser;
module.exports.checkNewUser=checkNewUser;
module.exports.localIST=localIST;
module.exports.allUsers=allUsers;