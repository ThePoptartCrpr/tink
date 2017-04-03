exports.run = (client, message, guild, params) => {
  let args = message.content.split(" ").slice(1);
  let kickee = message.guild.member(message.mentions.users.first());
  let kickuser = message.mentions.users.first();
  let kickMessage = args.slice(1).join(" ");
  let kickStamp = new Date();
  if (kickee === null) {
  message.channel.sendMessage(`Usage of !kick:\n!kick <usertag> <reason>`);
} else

if (kickMessage === "") {
  message.channel.sendMessage(`Usage of !kick:\n!kick <usertag> <reason>`);
} else {

kickee.sendMessage(`You have been kicked from server ${message.guild.name} by ${message.author} for: ${kickMessage}`).then(() => kickee.kick());
message.channel.sendMessage(`${kickee} has been kicked for: "${kickMessage}"`);
console.log(`${message.author} kicked ${kickee} with reason ${kickMessage}.`);
/*try {
 let modlogs = message.guild.channels.filter(c=>c.type === "text").find('name', 'mod-logs');
 modlogs.sendMessage(`Log: ${message.author.username} has kicked ${kickee} with reason: ${kickMessage}\n\n${kickStamp}.`);
 modlogs = modlogs.id;
} catch(e) {
  console.log('No mod-logs channel');
}*/

sqlm.get(`SELECT * FROM modlogs WHERE guildid ='${message.guild.id}'`).then(row => {
if (!row) {
  console.log('No row');
} else {
  if (row.tog === "true") {
    let mchannel = row.channel;
    mchannel = client.channels.filter(c=>c.type === "text").get(mchannel);
    //mchannel.sendMessage(`Log: ${message.author.username} has warned ${warnuser.username} with reason: ${warnMessage}\n\n${warnStamp}.`)
    mchannel.sendEmbed({
        color: 0xF71B1F,
        author: {
          name: message.author.username,
          icon_url: message.author.avatarURL
        },
        title: '',
        description: '',
        fields: [{
            name: '_ _',
            value: `**Action:** Kick\n**Member:** ${kickuser.username}#${kickuser.discriminator}\n**Reason:** ${kickMessage}\n**Responsible Moderator:** ${message.author.username}#${message.author.discriminator}`
          }
        ],
        timestamp: new Date(),
        footer: {
          //icon_url: client.user.avatarURL,
          text: 'Tink Moderation'
        }});
  } else {
    console.log('Modlogs toggled off.');
  }
}
}).catch(() => {
console.error;
sqlm.run('CREATE TABLE IF NOT EXISTS modlogs (guildid TEXT, channel TEXT, tog TEXT)').then(() => {
  sqlm.run('INSERT INTO modlogs (guildid, channel, tog) VALUES (?, ?, ?)', [message.guild.id, "test", "true"]);
});
});
}
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['k'],
  permLevel: 2
};

exports.help = {
  name: 'kick',
  description: 'Kicks the specified user.',
  usage: '+kick <@usertag> <reason>'
};
