const figlet = require('figlet');
exports.run = (client, message, [...text]) => {
  figlet(text.join(" "), (err, data) => {
    if (err) return console.log(err);
    return message.channel.sendCode("", data).catch(e => console.log('Error!'));
});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['banner', 'asciitext'],
  permLevel: 0
};

exports.help = {
  name: 'ascii',
  description: 'Generates an ASCII text banner.',
  usage: '+ascii <text>'
};
