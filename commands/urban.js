// From the komada-pieces repository
exports.run = async (client, message, [search, resultNum = 0]) => {
  const rp = require("request-promise-native");
  const baseUrl = "http://api.urbandictionary.com/v0/define?term=";
  const theUrl = baseUrl + search;
  try {
    const body = await rp.get(theUrl).then(JSON.parse);
    if (resultNum > 1) resultNum -= 1;

    const result = body.list[resultNum];
    if (!result) throw new Error("No entry found.");
    const wdef = result.definition.length > 1000
      ? `${client.funcs.splitText(result.definition, 1000)}...`
      : result.definition;
      const definition = [
        `**Word:** ${search}`,
        "",
        `**Definition:** ${resultNum += 1} out of ${body.list.length}\n_${wdef}_`,
        "",
        `**Example:**\n${result.example}`,
        `<${result.permalink}>`,
      ].join("\n");

      await message.channel.send(definition);
    } catch (e) {
      message.channel.send("No entry found.");
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ud', 'urbandictionary'],
  permLevel: 0
};

exports.help = {
  name: 'urban',
  description: 'Searches the Urban Dictionary.',
  usage: '+urban'
};
