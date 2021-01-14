var share = require("./share.js");
var verifyToken = require("./verifyToken.js");
var config = require("../config/constants.js");
var loginCount = 0;
var fs = require('fs'),
url = require("url"),
jwt = require('jsonwebtoken'),
bcrypt = require('bcryptjs');

function users(request, response) {
    response.send({"a":"b"});
}

function login(request, response) {
    var data=request.body;
    var email=data.username;
    var password=data.password;
    var checkLogin = share.checkLogin(email,password);
    Promise.all([checkLogin]).then(function(res){
        var result=res[0];
        var success=result.success;
        console.log(result);
        if(success==1){
            var user=result['data'];
            var token = jwt.sign({ id: user._id }, config.access_token_secret, {
                expiresIn: config.access_token_life // expires in 24 hours
            });
            response.setHeader('x-access-token', 'Bearer '+ token);
            response.status(200).send({auth:true,token:token});
        }else{
            response.status(403).send({"success":0,"message":"Invalid Username / Password"});
        }
    });
}

function add_user(request, response) {
    var data=request.body;
    var api_key=request.headers['x-access-token'];
    if(!api_key){ 
        response.send({"success":0,"message":"Access Token Invalid"});
    }else{
        var email=data.add_email;
        var checkEmail=share.checkNewUser(email);
        Promise.all([checkEmail]).then(function (results) {
            var duplicateEmail=results[0].length;
            if(duplicateEmail==0){      
                data['api_key']=api_key;
                var insert = share.insertUser(data);
                Promise.all([insert]).then(function(resl){
                    response.send({"success":1,"message":"User Detail has been added successfully"});
                });
            }else{
                response.send({"success":0,"message":"Please provide valid email address"});
            }
        });
    }
}

function delete_user(request, response) {
    var data=request.params;
    var id=data.id;
    var api_key=request.headers['x-access-token'];
    if(!api_key){ 
        response.send({"success":0,"message":"Access Token Invalid"});
    }else{
        data['api_key']=api_key;
        var deleteU = share.deleteUser(id);
        Promise.all([deleteU]).then(function(resl){
            if(resl[0].length!=0){
                response.send({"success":1,"message":"User Detail has been deleted successfully"});
            }else{
                response.send({"success":0,"message":"Please check the User ID"});
            }
        });
    }
    
}

app.post('/api/login', login);
app.post("/api/add_user",verifyToken, add_user);
app.get("/api/users",verifyToken, users);
app.get("/api/delete_user/:id",verifyToken, delete_user);