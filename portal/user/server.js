var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/", function(req,res){
  res.sendFile(path + "index.html");
});

router.get(/^[^.]+$/, function(req, res){
  res.sendFile(path + req.url + ".html");
});

app.use("/",router);

app.use("/semantic", express.static(__dirname + '/semantic'));

app.use("/js", express.static(__dirname + '/js'));

app.use("/css", express.static(__dirname + '/css'));

app.use("/img", express.static(__dirname + '/img'));

app.use("/video", express.static(__dirname + '/video'));

app.use("/activity", express.static(__dirname + '/activity'));

app.use("/reg", express.static(__dirname + '/reg'));

app.use("/ok", express.static(__dirname + '/ok'));

app.listen(8080,function(){
  console.log("Live at Port 8080");
});
