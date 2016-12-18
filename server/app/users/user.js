/**
 * Created by snatvb on 16.12.16.
 */


class User {
    constructor(id, name, online) {
        this.id = id;
        this.name = name;
        this.online = online || false;
    }
}

module.exports = User;