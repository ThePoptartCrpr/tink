const Discord = require('discord.js');
//const Cleverbot = require('cleverbot-node');
//const clbot = new Cleverbot();
const client = new Discord.Client();
const settings = require('./settings.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const yt = require('ytdl-core');
const request = require('request-promise');
const config = require('./config.json');
const sql = require('sqlite');
const sqlm = require('sqlite');
//const sqlc = require('sqlite');
// const prefixes = require('sqlite');
// const sqlt = require('sqlite');
sql.open('./score.sqlite');
sqlm.open('./modlogs.sqlite');
//sqlc.open('./cases.sqlite');
// prefixes.open('./prefixes.sqlite');
// sqlt.open('./guildpoints.sqlite');
client.yt = yt;
client.request = request;
client.prefix = settings.prefix;
// client.prefix = [];
client.config = config;
//client.clbot = clbot;
//client.Cleverbot = Cleverbot;
client.sql = sql;
client.sqlm = sqlm;
//client.sqlc = sqlc;
// client.sqlt = sqlt;
// client.prefixes = prefixes;
require('./util/eventLoader')(client);

let version = "BETA";
var queue = {};
var musicjoin = [];
var totalcommands = 0;
client.musicjoin = musicjoin;
client.queue = queue;
client.totalcommands = totalcommands;
client.version = version;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  log(`Loading a total of ${files.length} commands.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    log(`Loading Command: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  let permlvl = 0;
  let mod_role = message.guild.roles.find('name', settings.modrolename);
  if (mod_role && message.member.roles.has(mod_role.id)) permlvl = 2;
  let admin_role = message.guild.roles.find('name', settings.adminrolename);
  if (admin_role && message.member.roles.has(admin_role.id)) permlvl = 3;
  if (message.author.id === settings.ownerid) permlvl = 4;
  return permlvl;
};


var regToken =  /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(settings.token);
