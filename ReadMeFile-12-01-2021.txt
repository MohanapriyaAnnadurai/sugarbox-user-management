-----------------------------------Read Me File------------------------------------------------
1) Please create below user credential in MongoDB
db.createUser({user: "root",pwd: "U2FsdGVkX18pOmssDDJgVzuNOETBkfKSnQsiwPn0xoZOsW4/bx2ahA==",roles: [ {role: "readWrite", db: "testing1"} ]});

db.createUser({user:"admin",pwd:"U2FsdGVkX1/2xSz7lZN13aaRS3I/A0EKjpb37vw8ZiBas9DEh34IQQ==",roles:[{role:"userAdminAnyDatabase",db:"admin"},"readWriteAnyDatabase"]});
mongo -u "root" -p "UFsdGVkX19tM5wrfXCsSQU/lSR4MB+nWFR2YJRODxAlZ67edYABKw==" --authenticationDatabase "admin"

2) Import 3 collections into MongoDb