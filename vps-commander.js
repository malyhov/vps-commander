var express = require('express');
var env = require('node-env-file');

var app = express();
env(__dirname + '/.env');


app.set('port', process.env.PORT || 3000);
app.use(require('body-parser')());

// set 'showTests' context property if the querystring contains test=1
app.use(function(req, res, next) {
  res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
  next();
});


app.get('/', function(req, res) {
  res.sendFile(__dirname + '/static/index.html');
});

app.get('/api/dc', function(req, res) {
  var dc = ['srv1', 'srv2', 'srv3']
  res.send(dc);
});

app.get('/api/vps', function(req, res) {
  var vps = [
    {'srv1': ['mysql1', 'mysql2', 'mysql3']},
    {'srv2': ['kub1']},
    {'srv3': ['node1', 'node2']}
  ];
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.send(vps);
});

app.use(function(req, res, next){
  res.status(404);
  res.send('Endpoint does not exists');
});

app.listen(app.get('port'), function() {
  console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.' );
});
