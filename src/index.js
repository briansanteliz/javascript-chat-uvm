const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');


//middlewares
const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

//Mongo DB
mongoose.connect('mongodb+srv://lean:lean@cluster0-fevdd.mongodb.net/test?retrywrites=true&w=majority', {
useNewUrlParser: true
}) 
  .then(db => console.log(`DB is connected`))
   .catch(err => console.error(err));

//settings
app.set('port', process.env.PORT || 3000);
require('./sockets')(io);

//static files 
app.use(express.static(path.join(__dirname, 'public')));

//empezando el server
server.listen(3000, () => {
	console.log('servidor en linea', app.get('port'));
})