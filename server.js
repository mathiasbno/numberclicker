var express = require('express');
var app = express();

app.use(express.static('public/assets'));

app.get('/', function (req, res) {
  res.sendFile( __dirname + "/" + "index.htm" );
})

var server = app.listen(2000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("App listening at http://%s:%s", host, port)
})
