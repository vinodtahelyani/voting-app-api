var date = new Date();
var jwt = require('jsonwebtoken');

console.log(jwt.sign({voterId:'457/dg/23'},'some secret key').toString());