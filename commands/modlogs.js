const settings = require('../settings.json');
exports.run = function(client, message) {
  sqlm = message.client.sqlm;
  if (message.content.startsWith(settings.prefix + "modlogs location")) {
  let achannel = message.mentions.channels.first();
  if (!achannel) return message.channel.sendMessage('Please specify a valid channel.');
  channel = achannel.id;
  // console.log(channel);
  sqlm.get(`SELECT * FROM modlogs WHERE guildid = '${message.guild.id}'`).then(row => {
  if (!row) {
    sqlm.run('INSERT INTO modlogs (guildid, channel, tog) VALUES (?, ?, ?)', [message.guild.id, channel, "true"]);
    message.channel.sendMessage(`The new modlogs location is ${achannel}.`);
  } else {
    sqlm.run(`UPDATE modlogs SET channel = ${channel} WHERE guildid = '${message.guild.id}'`);
    message.channel.sendMessage(`Updated your modlogs channel location. I will now log everything in ${achannel}.`);
  }
  }).catch(() => {
  console.error;
  sqlm.run('CREATE TABLE IF NOT EXISTS modlogs (guildid TEXT, channel TEXT, tog TEXT)').then(() => {
  });
});
} else
if (message.content.startsWith(settings.prefix + "modlogs toggle")) {
  sqlm.get(`SELECT * FROM modlogs WHERE guildid ='${message.guild.id}'`).then(row => {
  if (!row) {
    message.channel.sendMessage('You currently do not have a modlogs location set. Please specify a location with !modlogs location <location>.');
  } else {
    if (row.tog === "true") {
      sqlm.run(`UPDATE modlogs SET tog = "false" WHERE guildid = '${message.guild.id}'`);
      message.channel.sendMessage('Modlogs toggled off for this guild.');
    } else {
      sqlm.run(`UPDATE modlogs SET tog = "true" WHERE guildid = '${message.guild.id}'`);
      message.channel.sendMessage('Modlogs toggled on for this guild.');
    }
  }
  }).catch(() => {
  console.error;
  sqlm.run('CREATE TABLE IF NOT EXISTS modlogs (guildid TEXT, channel TEXT, tog TEXT)').then(() => {
    sqlm.run('INSERT INTO modlogs (guildid, channel, tog) VALUES (?, ?, ?)', [message.guild.id, "test", "true"]);
  });
});
} else
if (message.content.startsWith(settings.prefix + "modlogs values")) {
  sqlm.get(`SELECT * FROM modlogs WHERE guildid ='${message.guild.id}'`).then(row => {
  if (!row) {
    message.channel.sendMessage('You currently do not have any values set. Set a location with \`!modlogs location <location>\`.');
  } else {
    let channels = row.channel;
    let on = row.tog;
    message.channel.sendEmbed({
        color: 3447003,
        /*author: {
          name: <Client>.user.username,
          icon_url: <Client>.user.avatarURL
        },*/
        title: 'Current values:',
        description: '',
        fields: [{
            name: 'Location:',
            value: `${client.channels.filter(c=>c.type === "text").get(channels)}`
          },
          {
            name: 'Enabled:',
            value: `${on}`
          }
        ],
        timestamp: new Date(),
        footer: {
          //icon_url: client.user.avatarURL,
          text: 'Tink'
        }});
  }
  }).catch(() => {
  console.error;
  sqlm.run('CREATE TABLE IF NOT EXISTS modlogs (guildid TEXT, channel TEXT, tog TEXT)').then(() => {
  });
});
} else {
  message.channel.sendMessage('Usage of !modlogs:\n!modlogs location <location>\n!modlogs toggle\n!modlogs values');
}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['modlog'],
  permLevel: 3
};

exports.help = {
  name: 'modlogs',
  description: 'Set the mod logs location.',
  usage: '+modlogs location <location> | !modlogs toggle | !modlogs values'
};
