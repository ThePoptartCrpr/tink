exports.run = (client, message) => {
  message.channel.sendMessage(message.guild.members.map(m => m.user.username).join(", "), { split: true });
	message.channel.sendMessage(`Total members: ` + message.guild.memberCount);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'list',
  description: 'Lists all members of your guild.',
  usage: '+list'
};
