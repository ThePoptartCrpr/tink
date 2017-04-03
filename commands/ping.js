exports.run = (client, message) => {
  message.channel.sendMessage('Ping?')
    .then(msg => {
      msg.edit(`Response time: \`${msg.createdTimestamp - message.createdTimestamp}ms\``);
    });
};

/*exports.run = (client, message) => {
  message.channel.sendMessage(`Response time: \`${Date.now() - message.createdTimestamp} ms\``);
};*/

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Calculates response time.',
  usage: '+ping'
};
