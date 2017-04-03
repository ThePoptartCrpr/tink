exports.run = function(client, message) {
  let args = message.content.split(" ").slice(1);
  /*let prefixes = message.client.prefixes;
  prefixes.get(`SELECT * FROM prefixes WHERE guildid ='${message.guild.id}'`).then(row => {
    prefixes.run(`UPDATE prefixes SET prefix = '${args}' WHERE guildid = '${message.guild.id}'`);
    message.channel.sendMessage(`The new prefix is ${args}.`);
}).catch(() => {
  console.error;
  sql.run('CREATE TABLE IF NOT EXISTS prefixes (userId TEXT, points INTEGER, level INTEGER)').then(() => {
    sql.run('INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)', [message.author.id, 1, 0]);
  });
});*/
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'prefix',
  description: 'Changes the prefix for your guild.',
  usage: '+prefix <prefix>'
};
