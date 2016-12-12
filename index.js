var argv = require('optimist')
  .alias('c', 'conversation')
  .alias('e', 'email')
  .alias('p', 'password')
  .argv;
var cryptobox = require('wire-webapp-cryptobox');
var stdin = process.openStdin();
var wire = require('wire-webapp-core');

var box = new cryptobox.Cryptobox(new cryptobox.store.Cache(), 10);
var user = new wire.User({email: argv.email, password: argv.password}, box);
var connectWebSocket = true;

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
