var fs = require('fs');

module.exports = function(app){
  app.get('/', function(req, res){
    res.render('index.html');
  });
  app.get('/fileread', function(req, res){
    fs.readFile('../names1.txt','utf-8', function(err, data){
      if(err) throw err;
      console.log(data);
      //res.end( data );
    });
  });
};
