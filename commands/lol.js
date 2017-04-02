const lols = ['It smells like someone sneezed!', 'You may not rest now, there is a dance off nearby!', 'WUT? I CAN\'T HEAR YOU OVER MY CAPS!', 'Just remember, if the world didn\'t suck, we\'d all fall off!', '\"You\'re a unit of power, Harry.\" \"I\'m a watt?"', 'I\'d tell you a joke about Unix, but I don\'t have permission.', 'Computers are like air conditioning. They both become useless after you open Windows.', 'Learning about spheres is pointless.', 'There\'s a fine line between a numerator and a denominator.', 'It smells like someone sneezed!'];

exports.run = (client, message) => {
  message.channel.sendMessage(`${lols[Math.floor(Math.random() * lols.length)]}`).catch(err => console.log(err.stack));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'lol',
  description: 'Prints a random funny message.',
  usage: '!lol'
};
