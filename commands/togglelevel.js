exports.run = (client, message) => {
  const sqlt = message.client.sql;
    sqlt.get(`SELECT * FROM guildpoints WHERE guildid ='${message.guild.id}'`).then(row => {
    if (!row) {
      sqlt.run('INSERT INTO guildpoints (guildid, istoggle) VALUES (?, ?)', [message.guild.id, "false"]);
    } else {
        if (row.istoggle === "false") {
          sqlt.run(`UPDATE guildpoints SET istoggle = "true" WHERE guildid = ${message.guild.id}`);
          message.channel.sendMessage('The points system is now functional in this guild.')
        } else {
        sqlt.run(`UPDATE guildpoints SET istoggle = "false" WHERE guildid = ${message.guild.id}`);
        message.channel.sendMessage('The points system is no longer functioning in this guild.')
      }
    }
  }).catch(() => {
    console.error;
    sqlt.run('CREATE TABLE IF NOT EXISTS guildpoints (guildid INT, istoggle TEXT)').then(() => {
      sqlt.run('INSERT INTO guildpoints (guildid, istoggle) VALUES (?, ?)', [message.guild.id, "false"]);
      message.channel.sendMessage('The points system is no longer functioning in this guild.')
    });
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'dasdawdwa dsa',
  description: 'Toggle the points system in your guild.',
  usage: '!togglepoints'
};
