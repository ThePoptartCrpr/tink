exports.run = (client, message, guild, params) => {
  sqlm = message.client.sqlm;
  //sqlc = message.client.sqlc;
  let cases;
  let args = message.content.split(" ").slice(1);
  let warnee = message.guild.member(message.mentions.users.first());
  let warnuser = message.mentions.users.first();
  let warnMessage = args.slice(1).join(" ");
  let warnStamp = new Date();
  if (!warnee) {
  message.channel.sendMessage(`Usage of !warn:\n!warn <@usertag> <reason>`);
} else

if (warnMessage === "") {
  message.channel.sendMessage(`Usage of !warn:\n!warn <@usertag> <reason>`);
} else {

warnee.sendMessage(`You have been warned in server ${message.guild.name} by ${message.author} for: ${warnMessage}`);
message.channel.sendMessage(`${warnee} has been warned with reason: "${warnMessage}"`);
console.log(`${message.author.username} warned ${warnee} with reason ${warnMessage}.`);
/*try {
 let modlogs = message.guild.channels.filter(c=>c.type === "text").find('name', 'mod-logs');
 modlogs.sendMessage(`Log: ${message.author.username} has warned ${warnee} with reason: ${warnMessage}\n\n${warnStamp}.`);
 modlogs = modlogs.id;
} catch(e) {
  console.log('No mod-logs channel');
}*/
/*sqlc.get(`SELECT * FROM cases WHERE guildid ='${message.guild.id}'`).then(row => {
if (!row) {
  sqlc.run('INSERT INTO cases (guildid, cases) VALUES (?, ?)', [message.guild.id, 1]);
  cases = row.cases;
  console.log(cases);
} else {
  sqlc.run(`UPDATE cases SET cases = ${row.cases + 1} WHERE guildid = '${message.guild.id}'`);
  cases = row.cases;
  cases += 1;
  console.log(cases);
}
}).catch(() => {
console.error;
sqlc.run('CREATE TABLE IF NOT EXISTS cases (guildid TEXT, cases INTEGER)').then(() => {
  sqlc.run('INSERT INTO cases (guildid, cases) VALUES (?, ?)', [message.guild.id, 1]);
});
});*/
sqlm.get(`SELECT * FROM modlogs WHERE guildid ='${message.guild.id}'`).then(row => {
if (!row) {
  console.log('No row');
} else {
  if (row.tog === "true") {
    let mchannel = row.channel;
    mchannel = client.channels.filter(c=>c.type === "text").get(mchannel);
    //mchannel.sendMessage(`Log: ${message.author.username} has warned ${warnuser.username} with reason: ${warnMessage}\n\n${warnStamp}.`)
    mchannel.sendEmbed({
        // color: 0xF71B1F,
        color: 0xEBDE2A,
        author: {
          name: message.author.username,
          icon_url: message.author.avatarURL
        },
        fields: [{
            name: '_ _',
            value: `**Action:** Warn\n**Member:** ${warnuser.username}#${warnuser.discriminator}\n**Reason:** ${warnMessage}\n**Responsible Moderator:** ${message.author.username}#${message.author.discriminator}`
          }
        ],
        timestamp: new Date(),
        footer: {
          //icon_url: client.user.avatarURL,
          //text: `Case #${cases}`
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
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'warn',
  description: 'Warns the specified user.',
  usage: '+warn <@usertag> <reason>'
};
