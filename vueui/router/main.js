var fs = require('fs');
var path = require('path');

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
    //req=object
    let dirs = new Array();

    fs.readdir(req.body.path, function(err, filelist){
      //console.log(typeof(filelist));
      try{
        for(var count in filelist){

          let stats = fs.statSync(path.resolve(req.body.path,filelist[count]));
          if(!stats.isFile()) {
            dirs.push( filelist[count]); /**/
          }
        }
      }catch(e){
        console.log(e);
      }

      res.send(dirs);
      res.end();
    });
  });
};
