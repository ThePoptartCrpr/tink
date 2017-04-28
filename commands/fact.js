const request = require('request');
exports.run = (client, message) => {
  request.get(`http://randomfactgenerator.net/`, function (error, response, body) {
    try {
    if (!error && response.statusCode == 200) {
        var reply = body.substring(body.indexOf(`<div id='z'>`)+12);
        reply = reply.substring(0, reply.indexOf(`<br/><br/>`));
        message.reply(reply).catch(e => console.log('Error sending message!'));
    } else {
        message.reply('An error has occured, please report this to ThePoptartCrpr#0554!').catch(e => console.log('Error sending message!'));
    }
  } catch(e) {
    message.reply('An error has occured, please report this to ThePoptartCrpr#0554!').catch(e => console.log('Error sending message!'));
  }
});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['randomfact'],
  permLevel: 0
};

exports.help = {
  name: 'fact',
  description: 'Grabs a random fact.',
  usage: '+fact'
};
