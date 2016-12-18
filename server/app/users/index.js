/**
 * Created by snatvb on 16.12.16.
 */

var User = require('./user');
var log = require('app/utils/log');

class Users {
    constructor() {
        this.users = [];
    }

    find(id, withIndex) {
        id = parseInt(id);
        if (isNaN(id)) {
            return this.users;
        }

        for (let i = 0, max = this.users.length; i < max; i++) {
            const user = this.users[i];
            if (user.id === id) {
                return withIndex === true ? {user, index: i} : user;
            }
        }
    }

    setOnline(id, status) {
        const user = this.find(id, true);
        if (!user || !this.users[user.index]) {
            return;
        }
        const updateUser = new User(user.user.id, user.user.name, status);
        this.users[user.index] = updateUser;
        return updateUser;
    }

    register(name) {
        if (typeof name !== 'string') {
            log.warn('Name is not string: ' + (name.toString && name.toString()));
            return false;
        }

        const user = new User(this.__getId(), name);
        this.users.push(user);
        return user;
    }

    /**
     * Если вдруг, добавили слишком быстро
     * Пример ниже (3 строки)
     * @returns {Number}
     * @private
     */
    __getId() {
        let ids = [];
        for (var i = 0, max = this.users.length; i < max; i++) {
            var user = this.users[i];
            ids.push(user.id);
        }
        let maxId = parseInt(Math.max(...ids));
        if (isNaN(maxId)) {
            return (new Date).getTime();
        } else {
            maxId++;
            return maxId;
        }
    }
}

const users = new Users;

users.register('Константин Андрюнин');
users.register('Андрей Авсенин');
users.register('Дмитрий Кравченко');

module.exports = users;