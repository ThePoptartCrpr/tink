const responses = ['Of course.', 'Yes, it is certain.', 'Definitely not.', 'Perhaps.', 'Maybe, maybe not.', 'No.'];

exports.run = (client, message) => {
  message.channel.sendMessage(`${responses[Math.floor(Math.random() * responses.length)]}`).catch(err => console.log(err.stack));
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
