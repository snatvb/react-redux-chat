/**
 * Created by snatvb on 18.12.16.
 */


module.exports = function (server) {
    var io = require('socket.io')(server);

    io.on('connection', function (socket) {
        var api = require('./api')(socket);
        console.log('connect user');
        socket.on('register', function (id) {
            api.register(id);
        });
        socket.on('send message', function (data) {
            api.sendMessage(data.userId, data.message);
        });
        socket.on('disconnect', function () {
            api.disconnect();
            console.log('disconnect user');
        });
    });
};