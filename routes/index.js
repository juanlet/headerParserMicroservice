var express = require('express');
var router = express.Router();
var os = require('os');

function getUserIP(req){
    return req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
}

function getUserLanguage(req){
    return req.headers["accept-language"].split(',')[0];
}

function getUserSoftware(req){
    var osInfoRegex= /\((.+)\)/;
    //.replace(/\([^()]*\)/g, '')
    var osData= req.headers['user-agent'].match(osInfoRegex)[1].split(';').slice(0,3);
    return osData[0]+"; "+osData[1]+" "+osData[2];
  
}

router.get('/', function(req, res, next) {
  
    
    res.redirect("/api/whoami");
});

/* GET home page. */
router.get('/api/whoami', function(req, res, next) {
  
  var ip=getUserIP(req);
  var userLanguage=getUserLanguage(req);
  var userSoftware=getUserSoftware(req);
  var userData= {"ipaddress": ip, "language": userLanguage, "software": userSoftware};
  console.log("The user ip is: "+ ip);
  console.log("The user language is: "+ userLanguage);
   console.log("The user OS is: "+ userSoftware);
   console.log(userData);
   res.json(userData);
});

module.exports = router;
