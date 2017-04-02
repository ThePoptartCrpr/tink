exports.run = (client, message, guild) => {
  message.channel.sendMessage(`Information for guild: ${message.guild.name}\nGuild ID: ${message.guild.id}\nOwner: ${message.guild.owner.user.username}\nCreated at: ${message.guild.createdAt}\nGuild Icon: ${message.guild.iconURL}`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['guildinfo', 'server', 'guild'],
  permLevel: 0
};

exports.help = {
  name: 'serverinfo',
  description: 'Displays statistics of the guild.',
  usage: '!stats'
};
