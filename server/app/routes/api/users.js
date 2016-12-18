/**
 * Created by snatvb on 16.12.16.
 */

const express = require('express');
const router = express.Router();
const Users = require('app/users');
const log = require('app/utils/log');


router.get('*', function (req, res, next) {
    var users = '[]';
    try {
        users = JSON.stringify(Users.find());
    } catch (error) {
        log.error(error);
        res.statusCode = 500;
        res.send("ERROR");
        return;
    }
    res.statusCode = 200;
    res.send(users);
});

module.exports = router;