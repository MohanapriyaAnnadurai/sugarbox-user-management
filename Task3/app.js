var share = require("./libs/share.js");
var router = require("./libs/router.js");
var config = require("./config/constants.js");
mongoUtil = require('./config/mongoUtil.js');
app.use(cookieParser());

http.listen(config.port_number,function() {
    console.log("Listening on " + config.port_number);
    mongoUtil.connectToServer( function(err ) {
        console.log("DB Connected");
    });
});
