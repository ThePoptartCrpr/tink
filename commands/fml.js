exports.run = (client, message) => {
  const request = require('superagent');
  const HTMLParser = require('fast-html-parser');
  request
  .get("http://www.fmylife.com/random")
  .end((err, res) => {
    if(err) return message.reply(err);
    const root = HTMLParser.parse(res.text);
    const article = root.querySelector('.block a');
    return message.channel.sendMessage(article.text + ':cry:');
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['fuckmylife'],
  permLevel: 0
};

exports.help = {
  name: 'fml',
  description: 'Prints a random FML quote.',
  usage: '+fml'
};
