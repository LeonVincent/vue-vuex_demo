'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
var env = require('./../env');
var PORT_href = env.API_href;
module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    API_ROOT: PORT_href,
    BASE_API: PORT_href
})