exports.run = (client, message) => {
  let args = message.content.split(" ").slice(1);
  let bannee = message.guild.member(message.mentions.users.first());
  let banuser = message.mentions.users.first();
  let banMessage = args.slice(1).join(" ");
  let banStamp = new Date();
  if (bannee === null) {
  message.channel.sendMessage(`Usage of !ban:\n!ban <usertag> <reason>`);
} else

if (banMessage === "") {
  message.channel.sendMessage(`Usage of !ban:\n!ban <usertag> <reason>`);
} else {

bannee.sendMessage(`You have been banned from server ${message.guild.name} by ${message.author} for: ${banMessage}`).then(() => bannee.ban());
message.channel.sendMessage(`${bannee} has been banned for: "${banMessage}"`);
console.log(`${message.author} banned ${bannee} with reason ${banMessage}.`);
/*try {
 let modlogs = message.guild.channels.filter(c=>c.type === "text").find('name', 'mod-logs');
 modlogs.sendMessage(`Log: ${message.author.username} has banned ${bannee} with reason: ${banMessage}\n\n${banStamp}.`);
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
            value: `**Action:** Ban\n**Member:** ${banuser.username}#${banuser.discriminator}\n**Reason:** ${banMessage}\n**Responsible Moderator:** ${message.author.username}#${message.author.discriminator}`
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
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'ban',
  description: 'Bans the specified user.',
  usage: '+ban <usertag> <reason>'
};
