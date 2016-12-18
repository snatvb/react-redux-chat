/**
 * Created by snatvb on 15.12.16.
 */

const winston = require('winston');
const ENV = process.env.NODE_ENV;

function getLogger (module) {
    const PATH = module.filename.split('/').slice(-2).join('/');

    return new winston.Logger({
        transports : [
            new winston.transports.Console({
                colorize : true,
                level : ENV === 'development' ?  'debug' : 'error',
                label : PATH
            })
        ]
    });
}

module.exports = getLogger;