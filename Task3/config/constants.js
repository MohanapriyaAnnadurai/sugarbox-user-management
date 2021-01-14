APP_PORT = 8003; 
APP_SESSION_SECRET = "SUGARBOXNETWORKPLATFORMSESSIONTASK3";
APP_REMEMBER_ME_AGE = 900000;
MONGODB_NAME = "sugarboxnetworks";
MONGODB_PASS = encodeURIComponent("UFsdGVkX19tM5wrfXCsSQU/lSR4MB+nWFR2YJRODxAlZ67edYABKw==");
APP_MONGODB_CONN_URL = "mongodb://root:"+MONGODB_PASS+"@localhost:27017/"+MONGODB_NAME+"?authSource=admin";
ACCESS_TOKEN_SECRET="dhw782wujnd99ahmmakhanjkajikhiwn2n";
ANGULAR_APP_URL='http://localhost:4200';
ACCESS_TOKEN_LIFE=86400;

module.exports.mongodb_conn_url = APP_MONGODB_CONN_URL;
module.exports.session_secret = APP_SESSION_SECRET;
module.exports.remember_me_age = APP_REMEMBER_ME_AGE;
module.exports.db_name = MONGODB_NAME;
module.exports.port_number = APP_PORT;
module.exports.access_token_secret = ACCESS_TOKEN_SECRET;
module.exports.access_token_life = ACCESS_TOKEN_LIFE;
module.exports.angular_app_url = ANGULAR_APP_URL;