const config = require('../config.json');
const request = require('request-promise');
module.exports = guild => {
  console.log(`${new Date().toLocaleTimeString()} Tink has been removed from ${guild.name}.`);

  let totalGuild = guild.client.guilds.size;
  let botsDiscordPwToken = config.botsDiscordPwToken;
  let botsDiscordPwUser = config.botsDiscordPwUser;
  let discordBotsList = config.discordBotsListToken;
  let discordBotsListUser = config.discordBotsListUser;

    const updateBotsDiscordPw = function(totalGuild) {
      if (botsDiscordPwToken && botsDiscordPwUser) {
        console.log(`Updating.`)
        console.log(`Tink is on ${totalGuild} servers.`);
        console.log('Posting stats to bots.discord.pw.');
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

    const updateDiscordBotsList = function(totalGuild) {
      if (botsDiscordPwToken && botsDiscordPwUser) {
        // console.log(`Updating.`)
        // console.log(`Tink is on ${totalGuild} servers.`);
        console.log('Posting stats to discordbots.org.');
        const requestBody = {
          method: 'POST',
          url: `https://discordbots.org/api/bots/${discordBotsListUser}/stats`,
          headers: {
            Authorization: discordBotsList,
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
    updateDiscordBotsList(totalGuild);
};
