exports.run = (client, message) => {
  var str = message.content.split(" ").slice(1).join(" ");
  try {
		if (str === "") {
			message.channel.sendMessage(`Usage of !google:\n!google <query>`);
		} else {
		var lmgtfy = str.replace(/ /g, "+");
		message.channel.sendMessage(`http://lmgtfy.com/?q=${lmgtfy}`);
		}
	} catch(e) {
		console.log(e);
	}
};

/*exports.run = (client, message) => {
  message.channel.sendMessage(`Response time: \`${Date.now() - message.createdTimestamp} ms\``);
};*/

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['lmgtfy'],
  permLevel: 0
};

exports.help = {
  name: 'google',
  description: 'Create a lmgtfy.com link based on your query.',
  usage: '!google <message>'
};
