/*
 * Wire
 * Copyright (C) 2016 Wire Swiss GmbH
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see http://www.gnu.org/licenses/.
 *
 */

'use strict';

const argv = require('optimist').alias('c', 'conversation').alias('e', 'email').alias('p', 'password').argv;
const cryptobox = require('wire-webapp-cryptobox');
const stdin = process.openStdin();
const wire = require('wire-webapp-core');

let box = new cryptobox.Cryptobox(new cryptobox.store.Cache(), 10);
let user = new wire.User({email: argv.email, password: argv.password}, box);
let connectWebSocket = true;

user
  .login(connectWebSocket)
  .then(function (service) {
    stdin.addListener("data", function (data) {
      service.conversation.sendTextMessage(argv.conversation, data.toString().trim());
    });
  })
  .catch(function (error) {
    console.log(`Error: ${error.message} (${error.stack})`);
  });
