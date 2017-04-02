const config = require('../config.json');

const chalk = require('chalk');
const request = require('request-promise');
module.exports = client => {
  console.log(`${new Date().toLocaleTimeString()} Tink initialized.`);

let totalGuild = client.guilds.size;
let botsDiscordPwToken = config.botsDiscordPwToken;
let botsDiscordPwUser = config.botsDiscordPwUser;

  const updateBotsDiscordPw = function(totalGuild) {
    if (botsDiscordPwToken && botsDiscordPwUser) {
      console.log(`Updating.`)
      console.log(`Tink is on ${totalGuild} servers.`);
      const requestBody = {
        method: 'POST',
        url: `https://bots.discord.pw/api/bots/${botsDiscordPwUser}/stats`,
        headers: {
          Authorization: botsDiscordPwToken,
          'Content-Type': 'application/json',
        },
        body: {
          // shard_id: parseInt(this.shardId, 10),
          // shard_count: parseInt(this.shardCount, 10),
          server_count: parseInt(totalGuild, 10),
        },
        json: true,
      };
      request(requestBody)
      .then((parsedBody) => {
        console.log(parsedBody);
      })
      .catch(error => console.log(error));
    }
  };

  updateBotsDiscordPw(totalGuild);
  client.user.setGame(`${totalGuild} servers | +help`);
};
