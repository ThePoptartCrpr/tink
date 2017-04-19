const config = require('../config.json');
const request = require('request-promise');
module.exports = (guild, client) => {
  guild.fetchMember(guild.ownerID).then(owner => {
    console.log(`${new Date().toLocaleTimeString()} Tink has been added to a new guild: ${guild.name}, owned by ${guild.owner.user.username}.`);
  });
  guild.defaultChannel.sendMessage(`Hello! I am Tink, a multipurpose bot for Discord developed by ThePoptartCrpr.\nFor a full list of commands, type !help!\nNeed help? Want the latest announcements? You can join my support server here: https://discord.gg/ZGS9P9G \nNote that I will not always be online, I am currently manually hosted. If I am not online, just wait a bit!`);

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
