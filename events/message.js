const settings = require('../settings.json');

module.exports = message => {
  let client = message.client;
  // let pointsfalse;
  const sql = message.client.sql;
  // const prefixes = message.client.prefixes;
  // const sqlt = message.client.sqlt;
  if (message.author.bot) return;
  /*if (message.content.startsWith('<@269568923706327060>') && !message.content.startsWith(settings.prefix)) {
    let args = message.content.split(' ').slice(1);
    message.client.Cleverbot.prepare(() => {
      message.client.clbot.write(args, (response) => {
        message.channel.startTyping();
        setTimeout(() => {
          message.channel.sendMessage(response.message).catch(console.error);
          message.channel.stopTyping();
        }, Math.random() * (1 - 3) + 1 * 1000);
      });
    });
  }*/

/*const getPrefix = function() {
  prefixes.get(`SELECT * FROM prefixes WHERE guildid ='${message.guild.id}'`).then(row => {
  if (!row) {
    prefixes.run('INSERT INTO prefixes (guildid, prefix) VALUES (?, ?)', [message.guild.id, "!"]);
    message.client.prefix[message.guild.id] = row.prefix;
  } else {
    //sql.run(`UPDATE pre SET points = ${row.points + 1} WHERE userId = ${message.author.id}`);
    message.client.prefix[message.guild.id] = row.prefix;
  }
}).catch(() => {
  console.error;
  prefixes.run('CREATE TABLE IF NOT EXISTS prefixes (guildid TEXT, prefix TEXT)').then(() => {
    prefixes.run('INSERT INTO prefixes (guildid, prefix) VALUES (?, ?)', [message.guild.id, "!"]);
    message.client.prefix[message.guild.id] = row.prefix;
  });
});
}
getPrefix();*/

const pointcount = function() {
  /*sqlt.get(`SELECT * FROM guildpoints WHERE guildid = '${message.guild.id}'`).then(row => {
    if (!row) {
    } else {
      if (row.istoggle === "false") return pointsfalse = "false";
    }
  }).catch(() => {
    console.error;
  })
  if (pointsfalse === "false") return console.log('false');*/
  sql.get(`SELECT * FROM scores WHERE userId ='${message.author.id}'`).then(row => {
  if (!row) {
    sql.run('INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)', [message.author.id, 1, 0]);
  } else {
    let curLevel = Math.floor(0.1 * Math.sqrt(row.points + 1));
    if (curLevel > row.level) {
      row.level = curLevel;
      sql.run(`UPDATE scores SET points = ${row.points + 1}, level = ${row.level} WHERE userId = ${message.author.id}`);
      message.channel.sendMessage(`:up: ${message.author.username} is now level **${curLevel}**!`);
    }
    sql.run(`UPDATE scores SET points = ${row.points + 1} WHERE userId = ${message.author.id}`);
  }
}).catch(() => {
  console.error;
  sql.run('CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER)').then(() => {
    sql.run('INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)', [message.author.id, 1, 0]);
  });
});
};

  pointcount();
  // console.log(message.client.prefix[message.guild.id]);
  /*setTimeout(function() {
    console.log(message.client.prefix[message.guild.id]);
  }, 1500);*/
  // if (!message.content.startsWith(message.client.prefix[message.guild.id])) return;
  if (!message.content.startsWith(settings.prefix)) return;
  message.client.totalcommands += 1;
  // let command = message.content.split(' ')[0].slice(message.client.prefix[message.guild.id].length);
  let command = message.content.split(' ')[0].slice(settings.prefix.length);
  let params = message.content.split(' ').slice(1);
  let args = message.content.split(" ").slice(1);
  var str = args.join(" ");
  var result = params.join(' ');
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  } else {
    message.channel.sendMessage(`Unknown command. Try \`${settings.prefix}help\` for a list of commands.`);
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return message.channel.sendMessage('You do not have permission to run that command.');
    cmd.run(client, message, params, perms);
  }

  if(message.channel.type == 'dm') {
    console.log(`${new Date().toLocaleTimeString()}: "+${command} ${result}" was used by ${message.author.username}#${message.author.discriminator}, in a direct message.`);
  } else {
    console.log(`${new Date().toLocaleTimeString()}: "+${command} ${result}" was used by ${message.author.username}#${message.author.discriminator}, in server ${message.guild.name}.`);
  }
};
