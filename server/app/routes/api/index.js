/**
 * Created by snatvb on 15.12.16.
 */

module.exports = function (app) {
    const auth = require('./auth');
    const users = require('./users');

    app.use('/api/auth/', auth);
    app.use('/api/users/', users);


    app.use('/api*', function(req, res) {
        res.statusCode = 404;
        res.send('Uri not found');
    });
};
