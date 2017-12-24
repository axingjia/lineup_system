var express=require('express');
var app=express();
var socket = require('socket.io');

app.set('view engine','ejs');
app.use("/public",express.static(__dirname + '/public'));

app.get('/',function(req,res){
	res.render("frontend");
	// res.send("hello world");
});
// app.get('/test',function(req,res){
// 	res.render("test");
// 	// res.send("hello world");
// });

app.get('/dashboard',function(req,res){
	res.render("dashboard");
	// res.send("hello world");
});
app.get('/staff',function(req,res){
	res.render("staff");
	// res.send("hello world");
});

var server=app.listen(3000,function(){
	console.log('Example app listening on port 3000!')
});
var phone_id=0;
var io=socket(server);
io.on('connection', function(socket){
  console.log('a user connected socket id='+socket.id);
  socket.on('submit',function(data){
  	phone_id++;
  	data.id=phone_id;
  	console.log(data);
  	io.sockets.emit('submit',data);
  })
  socket.on('delete',function(data){
  	// phone_id++;
  	// data.id=phone_id;
  	// console.log(data);
  	console.log('delete');
  	io.sockets.emit('delete',data);
  })
  
});

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!')
// })