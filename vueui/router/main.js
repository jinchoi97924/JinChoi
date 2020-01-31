var fs = require('fs');

module.exports = function(app){
  app.get('/', function(req, res){
    res.render('index.html');
  });
  app.get('/fileread', function(req, res){
    fs.readFile('../names1.txt','utf-8', function(err, data){
      if(err) throw err;
      console.log(data);
      res.end( data );
    });
  });

  app.post('/dirpath', function(req, res){
    console.log(req.body.path);
    fs.readdir(req.body.path, function(err, filelist){
      console.log(filelist);
    });
  });
};
