/**
 * Created by snatvb on 18.12.16.
 */

const Users = require('app/users');
var clients = [];

module.exports = function (socket) {
    return {
        user: null,
        register: function (id) {
            const user = Users.setOnline(id, true);
            if (!user) {
                socket.emit('register error', "user is not found");
                return;
            }
            this.user = user;

            clients.push({ user, socket });
            this.socksEmit('update users', Users.find());
        },
        socksEmit: function (event, data) {
            for (var i = 0, max = clients.length; i < max; i++) {
                var client = clients[i];
                client.socket.emit(event, data);
            }
        },
        sendMessage: function (userId, message) {
            const user = Users.setOnline(userId, true);
            if (!user) {
                socket.emit("new message reject", 'User not found');
                return;
            }
            for (var i = 0, max = clients.length; i < max; i++) {
                var client = clients[i];
                if (user.id === client.user.id) {
                    client.socket.emit("new message", {
                        user: this.user,
                        message,
                        msgOwn: this.user
                    });
                    socket.emit("new message", {
                        user,
                        message,
                        msgOwn: this.user
                    });
                }
            }
            socket.emit("new message reject", 'User not found online');
        },
        findClient: function (withIndex) {
            for (var i = 0, max = clients.length; i < max; i++) {
                var client = clients[i];
                if (client.socket === socket) {
                    return withIndex === true ? {client, index: i} : client;
                }
            }
        },
        disconnect: function () {
            if (!this.user) {
                return;
            }
            Users.setOnline(this.user.id, false);

            const thatClient = this.findClient(true);
            if (thatClient && thatClient.index >= 0) {
                clients.splice(thatClient.index, 1);
            }
            this.socksEmit('update users', Users.find());
        }
    };
};