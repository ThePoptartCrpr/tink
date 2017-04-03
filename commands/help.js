const settings = require('../settings.json');
const Discord = require('discord.js');
exports.run = (client, message, params) => {
  if (!params[0]) {
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    message.channel.sendCode('asciidoc', `= Command List =\n\n[Use ${settings.prefix}help <commandname> for details]\n\n${client.commands.map(c => `${settings.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}`).join('\n')}`);
    message.channel.sendMessage('To add me to your server, click here: http://bit.ly/2funTwG\n\nGot a question? Want the latest announcements? Join our support server here: https://discord.gg/ZGS9P9G')
    /*const embed = new Discord.RichEmbed()
  .setTitle(`Tink ${settings.version}`)
  .setAuthor('')
  .setColor(0x6E6E6E)
  .setDescription('For a moderation log of all punishments that users issue through Tink, simply create a text channel called "mod-logs". Tink will then log everything in that channel.')
  .setFooter('Developed by ThePoptartCrpr')
  .setTimestamp()
  .addField('Argument help:', '<argument> denotes a required argument.\n[argument] denotes an optional argument.\n@usertag denotes a tag to a member.')
  /*.addField('Commands:', 'For descriptions of Tink\'s commands, check out our documentation:\nhttp://tink-bot.weebly.com/commands-documentation.html', true)
  .addField('Utility commands: ', '```t\n!help\n!inviteme\n!ping\n!say <message>\n!lmgtfy <query>\n!google <query>\n!stats\n!serverinfo\n!guildinfo\n!userinfo [@usertag]\n!list\n!nickname <nickname>```')
  .addField('Fun commands:', '```t\n!8ball <question>\n!leet <message>\n!lol```')
  .addField('Moderation commands:', '```t\n!kick <@usertag> <reason>\n!warn <@usertag> <reason> \n!ban <@usertag> <reason>\n!addrole <@usertag> <reason>```')
  .addField('Commands:', `${client.commands.map(c => `${settings.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}`).join('\n')}`)
  .addField('Links:', '\nTo add me to your server, click here: http://bit.ly/2funTwG\n\nGot a question? Want the latest announcements? Join our support server here: https://discord.gg/ZGS9P9G', true);*/
  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.channel.sendCode('asciidoc', `= ${command.help.name} = \n${command.help.description}\nUsage: ${command.help.usage}`);
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h', 'halp'],
  permLevel: 0
};

exports.help = {
  name: 'help',
  description: 'Displays all the available commands for your permission level.',
  usage: '+help [command]'
};
