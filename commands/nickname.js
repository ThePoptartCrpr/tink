exports.run = (client, message, params, perms) => {
  let nicker = message.guild.member(message.mentions.users.first()) || message.member;
  let nickname = params.join(" ");
  if (nicker === message.member) {
	  message.channel.sendMessage(`Changed your nickname to ${nickname}.`);
    nicker.setNickname(nickname);
	} else {
    if (perms < 2) return message.channel.sendMessage('You do not have permission to change other people\'s nicknames.');
    let nicknamed = params.slice(1).join(" ");
    message.channel.sendMessage(`Changed ${nicker.user.username}'s nickname to ${nicknamed}.`);
    nicker.setNickname(nicknamed);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['nick'],
  permLevel: 0
};

exports.help = {
  name: 'nickname',
  description: 'Changes nicknames.',
  usage: '+nickname [@usertag]'
};
