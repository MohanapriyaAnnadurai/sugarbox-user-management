var share = require("./share.js");
var verifyToken = require("./verifyToken.js");
var config = require("../config/constants.js");
var loginCount = 0;
var fs = require('fs'),
url = require("url"),
jwt = require('jsonwebtoken'),
bcrypt = require('bcryptjs');

function login(request, response) {
    var data=request.body;
    var email=data.username;
    var password=data.password;
    var checkLogin = share.checkLogin(email,password);
    Promise.all([checkLogin]).then(function(res){
        var result=res[0];
        var success=result.success;
        if(success==1){
            var user=result['data'];
            var token = jwt.sign({ id: user._id }, config.access_token_secret, {
                expiresIn: config.access_token_life // expires in 24 hours
            });
            response.setHeader('x-access-token', 'Bearer '+ token);
            response.status(200).send({auth:true,token:token,data:user});
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

function add_user_task(request, response) {
    var data=request.body;
    var api_key=request.headers['x-access-token'];
    if(!api_key){ 
        response.send({"success":0,"message":"Access Token Invalid"});
    }else{
        var user_id=data.add_user_id;
        var task_arr=data.task_id;
        var addTask=share.addTask(user_id,task_arr);
        Promise.all([addTask]).then(function (results) {
            var res=results[0];
            if(res===1){      
                response.send({"success":1,"message":"Task Details has been added successfully"});
            }else{
                response.send({"success":0,"message":"Please provide valid task"});
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

function view_user(request, response) {
    var data=request.params;
    var id=data.id;
    var api_key=request.headers['x-access-token'];
    if(!api_key){ 
        response.send({"success":0,"message":"Access Token Invalid"});
    }else{
        var viewU = share.viewUser(id);
        Promise.all([viewU]).then(function(resl){
            var viewsUserData=resl[0];
            if(viewsUserData.length!=0){
                response.send({"success":1,"message":"",data:viewsUserData});
            }else{
                response.send({"success":0,"message":"No Data"});
            }
        });
    }
    
}
function users(request, response) {
    var api_key=request.headers['x-access-token'];
    if(!api_key){ 
        response.send({"success":0,"message":"Access Token Invalid"});
    }else{
        var allUsers = share.allUsers();
        Promise.all([allUsers]).then(function(resl){
            var viewsUserData=resl[0];
            if(viewsUserData.length!=0){
                response.send({"success":1,"message":"",data:viewsUserData});
            }else{
                response.send({"success":0,"message":"No Data"});
            }
        });
    }
    
}
app.post('/api/login', login);
app.post("/api/add_user",verifyToken, add_user);
app.post("/api/add_user_task",verifyToken, add_user_task);
app.get("/api/users",verifyToken, users);
app.get("/api/users/:id",verifyToken, view_user);
app.get("/api/delete_user/:id",verifyToken, delete_user);