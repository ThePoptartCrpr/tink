// From the komada-pieces repository
exports.run = async (client, message) => {
  // const request = require('superagent');
  const rp = require("request-promise-native");
  const HTMLParser = require('fast-html-parser');
  /*request
  .get("http://www.fmylife.com/random")
  .end((err, res) => {
    if(err) return message.reply(err);
    const root = HTMLParser.parse(res.text);
    const article = root.querySelector('.block a');
    return message.channel.sendMessage(article.text + ':cry:');
  });*/
  // Old code above, keeping it around in case new code breaks af
  try {
  const body = await rp.get("http://www.fmylife.com/random");
  const root = HTMLParser.parse(body);
  const article = root.querySelector(".block a");
  message.channel.send(article.text);
} catch (e) {
  console.log(e, "error");
}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['fuckmylife', 'fmylife'],
  permLevel: 0
};

exports.help = {
  name: 'fml',
  description: 'Prints a random FML quote.',
  usage: '+fml'
};
