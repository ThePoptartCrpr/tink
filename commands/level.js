exports.run = function(client, message, args) {
  message.client.sql.get(`SELECT * FROM scores WHERE userId ='${message.author.id}'`).then(row => {
        if (!row) return message.reply('Your current level is 0.');
        message.reply(`Your current level is ${row.level}.`);
      });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'level',
  description: 'Displays your current level.',
  usage: '+level'
};
