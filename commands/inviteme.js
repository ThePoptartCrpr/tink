exports.run = (client, message, args) => {
  message.channel.sendMessage('To add me to your server, click here: http://bit.ly/2funTwG \nYou can join my support server here: https://discord.gg/ZGS9P9G');
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['invite'],
  permLevel: 0
};

exports.help = {
  name: 'inviteme',
  description: 'Invite me to your server.',
  usage: '!inviteme'
};
