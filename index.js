var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
  
app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('/bootstrap/css/bootstrap.css', function(req, res){
  res.sendfile('bootstrap/css/bootstrap.css');
});

app.get('/bootstrap/js/bootstrap.js', function(req, res){
  res.sendfile('bootstrap/js/bootstrap.js');
});


app.get('/bootstrap/css/bootstrap-theme.css', function(req, res){
  res.sendfile('bootstrap/css/bootstrap-theme.css');
});

io.emit('some event', { for: 'everyone' });

io.on('connection', function(socket){
  socket.broadcast.emit('hi');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});
