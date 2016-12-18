/**
 * Created by snatvb on 15.12.16.
 */

const express = require('express');
const router = express.Router();
const Users = require('app/users');

router.get('/login/:id', function(req, res, next) {
    let user = Users.find(req.params.id);
    if(!user) {
        return next();
    }

    res.cookie('auth', user, {expires: new Date(Date.now() + 900000)});
    res.send(JSON.stringify(user));
});

module.exports = router;
