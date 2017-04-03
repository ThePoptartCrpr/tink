exports.run = function(client, message) {
  message.client.sql.get(`SELECT * FROM scores WHERE userId ='${message.author.id}'`).then(row => {
      if (!row) return message.reply('you do not have any points yet!');
      message.reply(`you currently have ${row.points} points.`);
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'points',
  description: 'Displays your current points.',
  usage: '+points'
};
