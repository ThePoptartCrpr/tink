exports.run = (client, message) => {
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
