var share = require("./share.js");
var config = require("../config/constants.js");
var loginCount = 0;
var fs = require('fs'),
url = require("url"),
jwt = require('jsonwebtoken'),
bcrypt = require('bcryptjs');

function new_data(request, response) {
    var data=request.body; 
    var insert = share.addData(data);
    Promise.all([insert]).then(function(resl){
        response.send({"success":1,"message":"Detail has been added successfully"});
    });
}
function view_data(request, response) {
    var id=request.params.id; 
    var view = share.viewData(id);
    Promise.all([view]).then(function(resl){
        var result=resl[0];
        response.send({"success":1,"data":result});
    });
}
app.post("/api/new_data", new_data);
app.get("/api/view_data/:id", view_data);