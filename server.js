const expresss = require('express');
const path = require('path');

const app = expresss();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(expresss.static(path.join(__dirname,'public')));
app.set('views',path.join(__dirname,'public'));
app.engine('html',require('ejs').renderFile);
app.set('view engine','html');

app.use('/',(req, res) => {
    res.render('index.html');
});

let messages = [];

io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`);

    socket.emit('previousMessages',messages);

    socket.on('sendMessage', data => {
        console.log(data);
        messages.push(data);
        socket.broadcast.emit('receivedMessage',data);
    });
});

const port = 3000;
server.listen(port);

console.log(`Server listen on ${port}`);