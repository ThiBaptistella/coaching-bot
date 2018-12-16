
const restify = require('restify');
const builder = require('botbuilder');

// create a connection to the server using restify 
const server = restify.createServer();
  
  server.listen(3978, function() {
    console.log('%s listening at %s', server.name, server.url);
  });

  // create a connector to chat with sever bot framework
  const connector = new builder.ChatConnector({
      appId: '',
      appPassword: ''
  });

  // endpoint exc msg to the user
  server.post('api.messages', connector.listen());
  const bot = new builder.UniversalBot(connector);

  //workflow dialog array
  bot.dialog('/', [
    session => {
        session.beginDialog('/introduction');
    }
  ]);

  bot.dialog('/introduction', [
    session => {
        builder.prompts.text(session, 'Hi! Whats your name?');
    },
    // let variable local
    (session, results) => {
        let msg = results.response;
        session.endDialog('Hi! ${msg}');
    }
  ])