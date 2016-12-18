module.exports = function (app) {
    const path = require('path');
    const publicPath = path.join(path.dirname(require.main.filename) + '/../public');
    require('./api')(app);

    app.use('*', function(req, res){
        res.sendFile(publicPath + '/index.html');
    });
};