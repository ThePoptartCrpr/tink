exports.run = (client, message, guild, params, str) => {
  var result = message.content.split(" ").slice(1).join(" ");
  if (result === "") return message.channel.sendMessage('Usage of !leet:\n!leet <message>');
  var leet = result.replace(/i/g, "1");
  leet = leet.replace(/o/g, "0");
  leet = leet.replace(/a/g, "4");
  leet = leet.replace(/g/g, "q");
  leet = leet.replace(/e/g, "3");
  leet = leet.replace(/s/g, "5");
  leet = leet.replace(/t/g, "7");
  leet = leet.replace(/I/g, "1");
  leet = leet.replace(/O/g, "0");
  leet = leet.replace(/A/g, "4");
  leet = leet.replace(/G/g, "q");
  leet = leet.replace(/E/g, "3");
  leet = leet.replace(/S/g, "5");
  leet = leet.replace(/T/g, "7");
message.channel.sendMessage(leet);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['leetspeak'],
  permLevel: 0
};

exports.help = {
  name: 'leet',
  description: 'Converts your message to leetspeak.',
  usage: '+leet <message>'
};
