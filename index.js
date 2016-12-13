'use strict';

const argv = require('optimist').alias('c', 'conversation').alias('e', 'email').alias('p', 'password').argv;
const cryptobox = require('wire-webapp-cryptobox');
const wire = require('wire-webapp-core');

let box = new cryptobox.Cryptobox(new cryptobox.store.Cache(), 10);
let user = new wire.User({email: argv.email, password: argv.password}, box);
let connectWebSocket = true;

user
  .login(connectWebSocket)
  .catch(function (error) {
    console.log(`Error: ${error.message} (${error.stack})`);
  });
