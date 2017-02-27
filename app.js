const Discord = require('discord.js');
const client = new Discord.Client();
var yt = require('ytdl-core');
const request = require('request-promise');

const config = require("./config.json");

let version = "1.2.2";

client.on('ready', () => {
  console.log(`${new Date()} Tink initialized.`);
  client.user.setGame(`Tink ${version} | !help`);

  let totalGuild = client.guilds.size;
  let botsDiscordPwToken = config.botsDiscordPwToken;
  let botsDiscordPwUser = config.botsDiscordPwUser;

    const updateBotsDiscordPw = function(totalGuild) {
      if (botsDiscordPwToken && botsDiscordPwUser) {
        console.log(`Updating.`)
        console.log(`Tink is on ${totalGuild} servers.`);
        const requestBody = {
          method: 'POST',
          url: `https://bots.discord.pw/api/bots/${botsDiscordPwUser}/stats`,
          headers: {
            Authorization: botsDiscordPwToken,
            'Content-Type': 'application/json',
          },
          body: {
            // shard_id: parseInt(this.shardId, 10),
            // shard_count: parseInt(this.shardCount, 10),
            server_count: parseInt(totalGuild, 10),
          },
          json: true,
        };
        request(requestBody)
        .then((parsedBody) => {
          console.log(parsedBody);
        })
        .catch(error => console.log(error));
      }
    };

    updateBotsDiscordPw(totalGuild);
});

client.on('disconnect', () => {
  console.log(`${new Date()} Tink disconnected.`);
});

client.on('reconnecting', () => {
  console.log(`${new Date()} Tink reconnecting.`);
});

let prefix = "!";

var queue = {};

var totalCommands = 0;

let musicplaying = "false";

var musicjoin = [];

client.on("guildMemberAdd", member => {
	if(member.guild.id === "110373943822540800") return;
	let guild = member.guild;
	guild.defaultChannel.sendMessage(`Welcome, ${member.user}, to this server.`);
	console.log(`Welcomed ${member.user.username} to server ${guild.name}`);
});

client.on("guildCreate", (guild, member) => {
	console.log(`Tink has been added to a new guild: ${guild.name}, owned by ${guild.owner.user.username}`)
	guild.defaultChannel.sendMessage(`Hello! I am Tink, a multipurpose bot for Discord developed by ThePoptartCrpr.\nFor a full list of commands, type !help!\nNeed help? Want the latest announcements? You can join my support server here: https://discord.gg/ZGS9P9G \nNote that I will not always be online, I am currently manually hosted. If I am not online, just wait a bit!\nCurrent version: ${version}`);
});


client.on('message', (message, guildmember, member, guildchannel, guild) => {
  if(message.author.bot) return;
  if(!message.content.startsWith(prefix)) return;

	try {
  if(message.guild.id === "110373943822540800") return;
	} catch(e) {
		console.log(`probably a pm`);
	}

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let timestamp = message.createdAt;
  let restartStamp = client.readyAt;

  let args = message.content.split(" ").slice(1);
  var str = message.content.split(" ").slice(1).join(" ");
  var result = args.join(' ');

  totalCommands += 1;

  if(message.channel.type == 'dm') {
    console.log(`${timestamp}: "!${command} ${result}" was used by ${message.author.username}, in a direct message.`);
  } else {
    console.log(`${timestamp}: "!${command} ${result}" was used by ${message.author.username}, in server ${message.guild.name}.`);
  }

  // Commands

  // Tink 1.2.0

  // MUSIC

  const connectVoiceChannel = function() {
    console.log('Connecting to voice channel');
  return new Promise((resolve, reject) => {
  const voiceChannel = message.member.voiceChannel;
  if (!voiceChannel || voiceChannel.type !== 'voice') return musicjoin[message.guild.id] = "false";
  musicjoin[message.guild.id] = "true";
  voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
});
};

const startMusicPlay = function() {
  try {

  if (musicjoin[message.guild.id] === "false") return;
  console.log('Starting to play');

  if (queue[message.guild.id] === undefined) return message.channel.sendMessage(`Add some songs to the queue first with ${prefix}music add.`);
  console.log(queue);
  if (queue[message.guild.id].playing) return;
  let dispatcher;
  queue[message.guild.id].playing = true;

  console.log(queue);
  (function play(song) {
    console.log(song);
    if (song === undefined) return message.channel.sendMessage('Queue concluded.').then(() => {
      queue[message.guild.id].playing = false;
      message.member.voiceChannel.leave();
    });
    message.channel.sendMessage(`Playing: **${song.title}** \nRequested by: **${song.requester}**`);
    dispatcher = message.guild.voiceConnection.playStream(yt(song.url, { audioonly: true }), { passes : config.passes });
    let collector = message.channel.createCollector(m => m);
    collector.on('message', m => {
      if (m.content.startsWith(prefix + 'music pause')) {
        message.channel.sendMessage('Music paused.').then(() => {dispatcher.pause();});
      } else if (m.content.startsWith(prefix + 'music resume')){
        message.channel.sendMessage('Music resumed.').then(() => {dispatcher.resume();});
      } else if (m.content.startsWith(prefix + 'music skip')){
        message.channel.sendMessage('Music skipped.').then(() => {dispatcher.end();});
      } else if (m.content.startsWith(prefix + 'music volume+')){
        if (Math.round(dispatcher.volume*50) >= 100) return message.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
        dispatcher.setVolume(Math.min((dispatcher.volume*50 + (2*(m.content.split('+').length-1)))/50,2));
        message.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
      } else if (m.content.startsWith(prefix + 'music volume-')){
        if (Math.round(dispatcher.volume*50) <= 0) return message.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
        dispatcher.setVolume(Math.max((dispatcher.volume*50 - (2*(m.content.split('-').length-1)))/50,0));
        message.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
      } else if (m.content.startsWith(prefix + 'time')){
        message.channel.sendMessage(`time: ${Math.floor(dispatcher.time / 60000)}:${Math.floor((dispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((dispatcher.time % 60000)/1000) : Math.floor((dispatcher.time % 60000)/1000)}`);
      }
    });
    dispatcher.on('end', () => {
      collector.stop();
      queue[message.guild.id].songs.shift();
      play(queue[message.guild.id].songs[0]);
    });
    dispatcher.on('error', (err) => {
      return message.channel.sendMessage('error: ' + err).then(() => {
        collector.stop();
        queue[message.guild.id].songs.shift();
        play(queue[message.guild.id].songs[0]);
      });
    });
  })(queue[message.guild.id].songs[0]);
} catch(e) {
  return;
}
};

  if (command === "music") {
	  if (message.content.startsWith(prefix + "music play")) {

      try {
        connectVoiceChannel();
      setTimeout(function() {
        startMusicPlay();
      }, 1500);
    } catch(e) {
    }

  } else

	  if (message.content.startsWith(prefix + 'music join')) {
		  return new Promise((resolve, reject) => {
			const voiceChannel = message.member.voiceChannel;
			if (!voiceChannel || voiceChannel.type !== 'voice') return message.reply('I couldn\'t connect to your voice channel...');
			message.channel.sendMessage('Joined your voice channel.');
			voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
		});
	  } else

	  /*if (message.content.startsWith(prefix + 'music skip')){
		message.channel.sendMessage('skipped').then(() => {dispatcher.end();});
	  } else*/

	  if (message.content.startsWith(prefix + 'music add')) {
		  let url = message.content.split(' ')[2];
		if (url == '' || url === undefined) return message.channel.sendMessage(`Usage of !music add:\n!music add <URL>`);
		yt.getInfo(url, (err, info) => {
			if(err) return message.channel.sendMessage('Invalid YouTube Link: ' + err);
			if (!queue.hasOwnProperty(message.guild.id)) queue[message.guild.id] = {}, queue[message.guild.id].playing = false, queue[message.guild.id].songs = [];
			queue[message.guild.id].songs.push({url: url, title: info.title, requester: message.author.username});
			message.channel.sendMessage(`Added **${info.title}** to the queue.`);
		});

    try {
      connectVoiceChannel();
    setTimeout(function() {
      startMusicPlay();
    }, 1500);
  } catch(e) {
  }

	  } else

	  if (message.content.startsWith(prefix + 'music queue')) {
		  if (queue[message.guild.id] === undefined) return message.channel.sendMessage(`Add some songs to the queue first with ${prefix}music queue.`);
		let tosend = [];
		queue[message.guild.id].songs.forEach((song, i) => { tosend.push(`${i+1}. ${song.title} - Requested by: ${song.requester}`);});
		message.channel.sendMessage(`__**${message.guild.name}'s Music Queue:**__ Currently **${tosend.length}** songs queued ${(tosend.length > 15 ? '*[Only next 15 shown]*' : '')}\n\`\`\`${tosend.slice(0,15).join('\n')}\`\`\``);

	  } else {
		  if (message.content.startsWith(prefix + 'music pause')) return;
		  if (message.content.startsWith(prefix + 'music resume')) return;
		  if (message.content.startsWith(prefix + 'music skip')) return;
		  if (message.content.startsWith(prefix + 'music volume')) return;
		  message.channel.sendMessage(`Usage of !music:\n!music queue <url>\n!music join\n!music play\n!music playing`);
	  }
  } else

  // Tink 1.1.0 -


  if (command === "inviteme") {
	  message.channel.sendMessage('To add me to your server, click here: http://bit.ly/2funTwG \nYou can join my support server here: https://discord.gg/ZGS9P9G');
  } else

  if (command === "say") {
	  message.channel.sendMessage(args.join(" "));
  } else

  if (command === "8ball") {
	let ballRandom = Math.floor(Math.random() * 6);
	if (ballRandom === 0) {
		message.channel.sendMessage('Of course.');
	} else
	if (ballRandom === 1) {
		message.channel.sendMessage('Yes, it is certain.');
	} else
	if (ballRandom === 2) {
		message.channel.sendMessage('Definitely not.');
	} else
	if (ballRandom === 3) {
		message.channel.sendMessage('Perhaps.');
	}
	if (ballRandom === 4) {
		message.channel.sendMessage('Maybe, maybe not.');
	} else
	if (ballRandom === 5) {
		message.channel.sendMessage('No.');
	}
  } else

  if (command === "list") {
	  message.channel.sendMessage(message.guild.members.map(m => m.user.username).join(", "), { split: true });
	  message.channel.sendMessage(`Total members: ` + message.guild.memberCount);
  } else

  if (command === "userinfo") {
	try {
	let infoUser = message.guild.member(message.mentions.users.first()) || message.member;
	let joinedAt = infoUser.joinedAt;
	var nickname = infoUser.nickname;
	let infoUserName = infoUser.user.username;
	let highestRole = infoUser.highestRole;
	if (nickname === null) {
		nickname = "N/A";
	}
	message.channel.sendMessage(`Showing info for user ${infoUser} (${infoUserName}).\nJoined at: ${joinedAt}\nNickname: ${nickname}\nHighest Role: ${highestRole}\n`);
	} catch(e) {
		console.log(`A dude just did !userinfo without any arguments`);
		message.channel.sendMessage(`Usage of !userinfo:\n!userinfo <@usertag>`);
	}
  } else

  if (command === "serverinfo") {
	  message.channel.sendMessage(`Information for guild: ${message.guild.name}\nGuild ID: ${message.guild.id}\nOwner: ${message.guild.owner.user.username}\nCreated at: ` + message.guild.createdAt + `\nGuild Icon: ` + message.guild.iconURL);
  } else

  if (command === "guildinfo") {
	  message.channel.sendMessage(`Information for guild: ${message.guild.name}\nGuild ID: ${message.guild.id}\nOwner: ${message.guild.owner.user.username}\nCreated at: ` + message.guild.createdAt + `\nGuild Icon: ` + message.guild.iconURL);
  } else

  if (command === "nickname") {
	if (args === "") {
		message.channel.sendMessage(`Usage of !nickname: \n!nickname <name>`);
	} else {
	if (message.member.hasPermission("CHANGE_NICKNAME")){
		message.member.setNickname(`${args.join(" ")}`);
		message.channel.sendMessage('Your nickname has been set to ' + args.join(" ") + '.');
	} else {
		message.channel.sendMessage('You do not have permission to change your nickname.');
	}
	}
  } else

  if (command === "ping") {
    message.channel.sendMessage(`Response time: \`${Date.now() - message.createdTimestamp} ms\``);
  } else

  if (command === "stats") {
	  message.channel.sendMessage('Current stats for Tink:\nCurrent servers: ' + client.guilds.size + '\nUsers: ' + client.users.size + `\nCommands dealt with since last restart: ${totalCommands} \nI have been running since ${restartStamp}.`);
  } else

  if (command === "kick") {
   let kickee = message.guild.member(message.mentions.users.first());
   let kickMessage = args.slice(1).join(" ");
   let kickStamp = new Date();

   if (kickee === null) {
	   message.channel.sendMessage(`Usage of !kick:\n!kick <usertag> <reason>`);
   } else

   if (kickMessage === "") {
	   message.channel.sendMessage(`Usage of !kick:\n!kick <usertag> <reason>`);
   } else {

   if (message.member.hasPermission("KICK_MEMBERS")){
	kickee.sendMessage(`You have been kicked from server ${message.guild.name} by ${message.author} for: ${kickMessage}`).then(() => kickee.kick());
	message.channel.sendMessage(`${kickee} has been kicked for: "${kickMessage}"`);
	console.log(`${message.author} kicked ${kickee} with reason ${kickMessage}.`);
	try {
		let modlogs = message.guild.channels.filter(c=>c.type === "text").find('name', 'mod-logs');
		modlogs.sendMessage(`Log: ${message.author.username} has kicked ${kickee} with reason: ${kickMessage}\n\n${kickStamp}.`);
		modlogs = modlogs.id;
   } catch(e) {
	   console.log('No mod-logs channel');
   }


   } else {
	   message.reply('you do not have permission to kick members.');
	   console.log(`${message.author} attempted to kick ${kickee} with reason ${kickMessage}.`);
   }

  }
  } else

  if (command === "addrole") {
	if (message.member.hasPermission("MANAGE_ROLES")){
		try {
			let roleAdd = args.slice(1).join(" ");
			let rolePerson = message.guild.member(message.mentions.users.first());

			if (rolePerson === null) {
				message.channel.sendMessage(`Usage of !addrole:\n!addrole <usertag> <rolename>\nNote that this role must already exist.`);
			} else

			if (roleAdd === "") {
				message.channel.sendMessage(`Usage of !addrole:\n!addrole <usertag> <rolename>\nNote that this role must already exist.`);
			} else {
				message.guild.member(message.mentions.users.first()).addRole(message.guild.roles.find("name", roleAdd));
				message.channel.sendMessage(`Successfully added role ${roleAdd} to user ${rolePerson}.`);
			}
	} catch(e) {
		message.channel.sendMessage(`Error! Either this role does not exist or I cannot change the roles of the specified person.`);
	}
	} else {
		message.reply(`you do not have permission to manage roles.`);
	}
  }	else

  if (command === "warn") {
	  let warnee = message.guild.member(message.mentions.users.first());
	  let warnMessage = args.slice(1).join(" ");
	  let warnStamp = new Date();

	if (warnee === null) {
	   message.channel.sendMessage(`Usage of !warn:\n!warn <usertag> <reason>`);
   } else

   if (warnMessage === "") {
	   message.channel.sendMessage(`Usage of !warn:\n!warn <usertag> <reason>`);
   } else {

   if (message.member.hasPermission("KICK_MEMBERS")){
	   try {
		let modlogs = message.guild.channels.filter(c=>c.type === "text").find('name', 'mod-logs');
		modlogs.sendMessage(`Log: ${message.author.username} has warned ${warnee} with reason: ${warnMessage}\n\n${warnStamp}.`);
		modlogs = modlogs.id;
   } catch(e) {
	   console.log('No mod-logs channel');
   }
   warnee.sendMessage(`You have been warned in server ${message.guild.name} by ${message.author} for: ${warnMessage}`);
   console.log(`${message.author} warned ${warnee} with reason ${warnMessage}.`);
   message.channel.sendMessage(`${warnee} has been warned for: "${warnMessage}"`);
   } else {
	   message.reply('you do not have permission to warn members.');
   }
   }
  } else

  if (command === "ban") {
   let bannee = message.guild.member(message.mentions.users.first());
   let banMessage = args.slice(1).join(" ");
   let banStamp = new Date();

   if (bannee === null) {
	   message.channel.sendMessage(`Usage of !ban:\n!ban <usertag> <reason>`);
   } else

   if (banMessage === "") {
	   message.channel.sendMessage(`Usage of !ban:\n!ban <usertag> <reason>`);
   } else {

   if (message.member.hasPermission("BAN_MEMBERS")){
	bannee.sendMessage(`You have been banned from server ${message.guild.name} by ${message.author} for: ${banMessage}`).then(() => bannee.ban());
	message.channel.sendMessage(`${bannee} has been banned for: "${banMessage}"`);
	console.log(`${message.author} banned ${bannee} with reason ${banMessage}.`);
	try {
		let modlogs = message.guild.channels.filter(c=>c.type === "text").find('name', 'mod-logs');
		modlogs.sendMessage(`Log: ${message.author.username} has banned ${bannee} with reason: ${banMessage}\n\n${banStamp}.`);
		modlogs = modlogs.id;
   } catch(e) {
	   console.log('No mod-logs channel');
   }

   } else {
	   message.reply('you do not have permission to ban members.');
	   console.log(`${message.author} attempted to ban ${bannee} with reason ${banMessage}.`);
   }

   }
  } else

  if (command === "purge" ) {
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
      var messagecount = parseInt(result);
      var messagecount2 = messagecount + 1;

      if (result === "") {
        message.channel.sendMessage('Usage of !purge:\n!purge <number>');
      } else {
        message.channel.fetchMessages({limit: messagecount2}).then(messages => message.channel.bulkDelete(messages));
        message.channel.sendMessage(`Successfully bulk deleted ${messagecount} messages.`);
      }
    } else {
      message.reply('you do not have permission to delete messages.');
    }
  } else

  if (command === "lmgtfy") {
	try {
		if (str === "") {
			message.channel.sendMessage(`Usage of !lmgtfy:\n!lmgtfy <query>`);
		} else {
		var lmgtfy1 = str.replace(/ /g, "+");
		message.channel.sendMessage(`http://lmgtfy.com/?q=${lmgtfy1}`);
		}
	} catch(e) {
		console.log(e);
	}
  } else

  if (command === "google") {
	try {
		if (str === "") {
			message.channel.sendMessage(`Usage of !google:\n!google <query>`);
		} else {
		var lmgtfy1 = str.replace(/ /g, "+");
		message.channel.sendMessage(`http://lmgtfy.com/?q=${lmgtfy1}`);
		}
	} catch(e) {
		console.log(e);
	}
  } else

  if (command === "leet") {
	try {
	var leet = str.replace(/i/g, "1");
	leet = leet.replace(/o/g, "0");
	leet = leet.replace(/a/g, "4");
	leet = leet.replace(/g/g, "q");
	leet = leet.replace(/e/g, "3");
	leet = leet.replace(/s/g, "5");
	leet = leet.replace(/t/g, "7");
	leet = leet.replace(/I/g, "1");
	leet = leet.replace(/O/g, "0");
	leet = leet.replace(/A/g, "4");
	leet = leet.replace(/G/g, "q");
	leet = leet.replace(/E/g, "3");
	leet = leet.replace(/S/g, "5");
	leet = leet.replace(/T/g, "7");
	message.channel.sendMessage(leet);
	} catch(e) {
		message.channel.sendMessage(`Usage of !leet:\n!leet <message>`);
	}
  } else

  if (command === "lol") {
	  let lolRandom = Math.floor(Math.random() * 10);
	  if (lolRandom === 0) {
		  message.channel.sendMessage('It smells like someone sneezed!');
	  } else

	  if (lolRandom === 1) {
		  message.channel.sendMessage('You may not rest now, there is a dance off nearby!');
	  } else

	  if (lolRandom === 2) {
		  message.channel.sendMessage(`WUT? I CAN'T HEAR YOU OVER MY CAPS!`);
	  } else

	  if (lolRandom === 3) {
		  message.channel.sendMessage(`Just remember, if the world didn't suck, we'd all fall off!`);
	  } else

	  if (lolRandom === 4) {
		  message.channel.sendMessage(`"You're a unit of power, Harry." "I'm a watt?"`);
	  } else

	  if (lolRandom === 5) {
		  message.channel.sendMessage(`I'd tell you a joke about Unix, but I don't have permission.`);
	  } else

	  if (lolRandom === 6) {
		  message.channel.sendMessage(`Computers are like air conditioning. They both become useless after you open Windows.`);
	  } else

	  if (lolRandom === 7) {
		  message.channel.sendMessage(`Learning about spheres is pointless.`);
	  } else

	  if (lolRandom === 8) {
		  message.channel.sendMessage(`There's a fine line between a numerator and a denominator.`);
	  }	else

	  if (lolRandom === 9) {
		  message.channel.sendMessage(`It smells like someone sneezed!`);
	  }	else {
	  }
  } else

  if (command === "help") {
  const embed = new Discord.RichEmbed()
  .setTitle(`Tink ${version}`)
  .setAuthor('')
  .setColor(0x6E6E6E)
  .setDescription('For a moderation log of all punishments that users issue through Tink, simply create a text channel called "mod-logs". Tink will then log everything in that channel.')
  .setFooter('Developed by ThePoptartCrpr')
  .setTimestamp()
  .addField('Argument help:', '<argument> denotes a required argument.\n[argument] denotes an optional argument.\n@usertag denotes a tag to a member.')
  .addField('Commands:', 'For descriptions of Tink\'s commands, check out our documentation:\nhttp://tink-bot.weebly.com/commands-documentation.html', true)
  .addField('Utility commands: ', '```t\n!help\n!inviteme\n!ping\n!say <message>\n!lmgtfy <query>\n!google <query>\n!stats\n!serverinfo\n!guildinfo\n!userinfo [@usertag]\n!list\n!nickname <nickname>```')
  .addField('Fun commands:', '```t\n!8ball <question>\n!leet <message>\n!lol```')
  .addField('Moderation commands:', '```t\n!kick <@usertag> <reason>\n!warn <@usertag> <reason> \n!ban <@usertag> <reason>\n!addrole <@usertag> <reason>```')
  .addField('To add me to your server, click here: http://bit.ly/2funTwG', '\n\n\nGot a question? Want the latest announcements? Join our support server here: https://discord.gg/ZGS9P9G', true);

message.author.sendEmbed(
  embed,
  'Help menu for Tink.',
  { disableEveryone: true }, { split: true}
);
	message.reply('you have been sent help documentation.');
  } else {
	  message.reply('I am not sure what you meant by that. Try `!help` for a list of commands.');
  }

});

client.login(config.token);
