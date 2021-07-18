var express = require('express');
app = express();

var history = require('connect-history-api-fallback');
app.use(history());
var serveStatic = require('serve-static');
app.use(serveStatic(__dirname + "/dist"));

var path = require('path');
var port = process.env.PORT || 8080;
app.listen(port);
console.log('server started '+ port);
