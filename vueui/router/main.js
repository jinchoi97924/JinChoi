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

    //req=object
    let dirs = new Array();

    fs.readdir(req.body.path, function(err, filelist){
      //console.log(typeof(filelist));

      for(var count in filelist){
          let stats = fs.statSync(req.body.path + "\\" + filelist[count]);

          if(!stats.isFile()) {
            dirs.push( filelist.splice(count,1));
          }
        }
      res.send(dirs);
      res.end();
    });
  });
};
