exports.run = (client, message, params) => {
  message.channel.sendMessage(params.join(" "));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'say',
  description: 'Prints your message.',
  usage: '+say <message>'
};
