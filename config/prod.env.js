'use strict'
var env = require('./../env');
var PORT_href = env.API_href;
module.exports = {
    NODE_ENV: '"production"',
    API_ROOT: PORT_href,
    BASE_API: PORT_href
}