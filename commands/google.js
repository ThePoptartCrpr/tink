exports.run = (client, message) => {
  var str = message.content.split(" ").slice(1).join(" ");
  try {
		if (str === "") {
			message.channel.sendMessage(`Usage of !google:\n!google <query>`);
		} else {
    var lmgtfy = str.replace(/%/g, "%25");
		lmgtfy = lmgtfy.replace(/@/g, "%40");
    lmgtfy = lmgtfy.replace(/#/g, "%23");
    lmgtfy = lmgtfy.replace(/\$/g, "%24");
    lmgtfy = lmgtfy.replace(/\^/g, "%5E");
    lmgtfy = lmgtfy.replace(/&/g, "%26");
    lmgtfy = lmgtfy.replace(/=/g, "%3D");
    lmgtfy = lmgtfy.replace(/\+/g, "%2B");
    lmgtfy = lmgtfy.replace(/`/g, "%60");
    lmgtfy = lmgtfy.replace(/'/g, "%27");
    lmgtfy = lmgtfy.replace(/"/g, "%22");
    lmgtfy = lmgtfy.replace(/;/g, "%3B");
    lmgtfy = lmgtfy.replace(/:/g, "%3A");
    lmgtfy = lmgtfy.replace(/,/g, "%2C");
    lmgtfy = lmgtfy.replace(/</g, "%3C");
    lmgtfy = lmgtfy.replace(/>/g, "%3E");
    lmgtfy = lmgtfy.replace(/\//g, "%2F");
    lmgtfy = lmgtfy.replace(/\?/g, "%3F");
    lmgtfy = lmgtfy.replace(/ /g, "+");
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
  usage: '+google <message>'
};
