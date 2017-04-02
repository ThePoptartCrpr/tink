exports.run = (client, message) => {
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
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ask'],
  permLevel: 0
};

exports.help = {
  name: '8ball',
  description: 'Ask the great 8 Ball a question.',
  usage: '!8ball <message>'
};
