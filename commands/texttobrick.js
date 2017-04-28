exports.run = (client, message, [...text]) => {
  text = text.join(" ").toLowerCase().replace(/ /g, "   ").replace(/[a-z]/g, ":regional_indicator_$&:");
  message.channel.sendMessage(text);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['brick', 'ttb'],
  permLevel: 0
};

exports.help = {
  name: 'texttobrick',
  description: 'Generates brick text.',
  usage: '+texttobrick <text>'
};
