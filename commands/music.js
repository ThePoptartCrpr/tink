exports.run = (client, message, queue, musicjoin) => {
  const connectVoiceChannel = function() {
    return new Promise((resolve, reject) => {
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel || voiceChannel.type !== 'voice') return message.client.musicjoin[message.guild.id] = "false";
    message.client.musicjoin[message.guild.id] = "true";
    voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
  });
  };

  const startMusicPlay = function() {
    try {
    console.log(message.client.musicjoin[message.guild.id]);
    if (message.client.musicjoin[message.guild.id] === "false") return;

    if (message.client.queue[message.guild.id] === undefined) return message.channel.sendMessage(`Add some songs to the queue first with ${client.config.prefix}music add.`);
    console.log(queue);
    if (message.client.queue[message.guild.id].playing) return;
    let dispatcher;
    message.client.queue[message.guild.id].playing = true;
    // console.log(queue[message.guild.id].playing);

    console.log(queue);
    (function play(song) {
      //musicplaying = "true";
      console.log(song);
      if (song === undefined) return message.channel.sendMessage('Queue concluded.').then(() => {
        queue[message.guild.id].playing = false;
        message.member.voiceChannel.leave();
        // musicplaying = "false";
      });
      message.channel.sendMessage(`Playing: **${song.title}** \nRequested by: **${song.requester}**`);
      dispatcher = message.guild.voiceConnection.playStream(message.client.yt(song.url, { audioonly: true }), { passes : message.client.config.passes });
      let collector = message.channel.createCollector(m => m);
      collector.on('message', m => {
        if (m.content.startsWith(client.config.prefix + 'music pause')) {
          message.channel.sendMessage('Music paused.').then(() => {dispatcher.pause();});
        } else if (m.content.startsWith(client.config.prefix + 'music resume')){
          message.channel.sendMessage('Music resumed.').then(() => {dispatcher.resume();});
        } else if (m.content.startsWith(client.config.prefix + 'music skip')){
          message.channel.sendMessage('Music skipped.').then(() => {dispatcher.end();});
        } else if (m.content.startsWith(client.config.prefix + 'music volume+')){
          if (Math.round(dispatcher.volume*50) >= 100) return message.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
          dispatcher.setVolume(Math.min((dispatcher.volume*50 + (2*(m.content.split('+').length-1)))/50,2));
          message.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
        } else if (m.content.startsWith(client.config.prefix + 'music volume-')){
          if (Math.round(dispatcher.volume*50) <= 0) return message.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
          dispatcher.setVolume(Math.max((dispatcher.volume*50 - (2*(m.content.split('-').length-1)))/50,0));
          message.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
        } else if (m.content.startsWith(client.config.prefix + 'time')){
          message.channel.sendMessage(`time: ${Math.floor(dispatcher.time / 60000)}:${Math.floor((dispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((dispatcher.time % 60000)/1000) : Math.floor((dispatcher.time % 60000)/1000)}`);
        }
      });
      dispatcher.on('end', () => {
        collector.stop();
        message.client.queue[message.guild.id].songs.shift();
        play(message.client.queue[message.guild.id].songs[0]);
      });
      dispatcher.on('error', (err) => {
        return message.channel.sendMessage('error: ' + err).then(() => {
          collector.stop();
          message.client.queue[message.guild.id].songs.shift();
          play(message.client.queue[message.guild.id].songs[0]);
        });
      });
    })(message.client.queue[message.guild.id].songs[0]);
  } catch(e) {
    return
  }
  };

if (message.content.startsWith("+music play")) {
      try {
        connectVoiceChannel();
      setTimeout(function() {
        startMusicPlay();
      }, 1500);
    } catch(e) {
    }
  } else

  if (message.content.startsWith('+music join')) {
		  return new Promise((resolve, reject) => {
			const voiceChannel = message.member.voiceChannel;
			if (!voiceChannel || voiceChannel.type !== 'voice') return message.reply('I couldn\'t connect to your voice channel...');
			message.channel.sendMessage('Joined your voice channel.');
			voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
		});
	  } else

    if (message.content.startsWith('+music add')) {
		  let url = message.content.split(' ')[2];
		if (url == '' || url === undefined) return message.channel.sendMessage(`Usage of !music add:\n!music add <URL>`);
		message.client.yt.getInfo(url, (err, info) => {
			if(err) return message.channel.sendMessage('Invalid YouTube Link: ' + err);
			if (!message.client.queue.hasOwnProperty(message.guild.id)) message.client.queue[message.guild.id] = {}, message.client.queue[message.guild.id].playing = false, message.client.queue[message.guild.id].songs = [];
			message.client.queue[message.guild.id].songs.push({url: url, title: info.title, requester: message.author.username});
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

    if (message.content.startsWith(message.client.prefix + 'music queue')) {
		  if (message.client.queue[message.guild.id] === undefined) return message.channel.sendMessage(`Add some songs to the queue first with ${client.config.prefix}music queue.`);
		let tosend = [];
		message.client.queue[message.guild.id].songs.forEach((song, i) => { tosend.push(`${i+1}. ${song.title} - Requested by: ${song.requester}`);});
		message.channel.sendMessage(`__**${message.guild.name}'s Music Queue:**__ Currently **${tosend.length}** songs queued ${(tosend.length > 15 ? '*[Only next 15 shown]*' : '')}\n\`\`\`${tosend.slice(0,15).join('\n')}\`\`\``);

	  } else {
		  if (message.content.startsWith(message.client.prefix + 'music pause')) return;
		  if (message.content.startsWith(message.client.prefix + 'music resume')) return;
		  if (message.content.startsWith(message.client.prefix + 'music skip')) return;
		  if (message.content.startsWith(message.client.prefix + 'music volume')) return;
      console.log(message.content);
      console.log(message.client.prefix);
		  message.channel.sendMessage(`Usage of !music:\n!music queue <url>\n!music join\n!music play\n!music playing`);
	  }
  }

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'music',
  description: 'Play music through a voice channel.',
  usage: '+music <add <url> | play | join | queue | pause | resume | skip | volume+ | volume->'
};
