'use strict';

var http = require('http');
var url = require('url');
var listenPort = 8001;

http.createServer(function (req, res) {
  var url_parts = url.parse(req.url).pathname.split('/');
  var action = url_parts[1];
  var value = url_parts[2];
  var result = getActionResult(action, value);
  var wait = Math.ceil(Math.random() * 3000);
  console.log('Waiting for ' + wait + ' millisecond.');

  setTimeout(function() {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    var response = {value: result};
    res.end(JSON.stringify(response));
  }, wait);

}).listen(listenPort);
console.log('Server running at http://127.0.0.1:' + listenPort + '/');

function getActionResult(action, value) {
  value = Number(value);
  if (isNaN(value)) {
    value = 0;
  }
  switch(action) {
    case 'double':
     return value * 2;
    case 'tripple':
      return value * 3;
    case 'quad':
      return value * 4;
    case 'weather':
      var w = ['clear', 'cloudy', 'stormy', 'foggy'];
      return w[Math.floor(Math.random() * 4)];
    case 'time':
      var t = ['morning', 'afteroon', 'evening', 'night'];
      return t[Math.floor(Math.random() * 4)];
    default:
      return value;
  }
}
