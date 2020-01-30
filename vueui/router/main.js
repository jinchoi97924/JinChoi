var fs = require('fs');

module.exports = function(app){
  app.get('/', function(req, res){
    res.render('index.html');

  });
  app.get('/readFile', function(req, res){
    fs.readFile();
  });
};
