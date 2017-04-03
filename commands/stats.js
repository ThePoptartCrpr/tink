exports.run = (client, message, guild, totalDealtCommands) => {
  message.channel.sendMessage('Current stats for Tink:\nServers: ' + client.guilds.size + `\nCommands dealt with since last restart: ${message.client.totalcommands}`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'stats',
  description: 'Displays statistics for Tink.',
  usage: '+stats'
};
