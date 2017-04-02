module.exports = (guild, client) => {
  console.log(`${new Date().toLocaleTimeString()} Tink has been added to a new guild: ${guild.name}, owned by ${guild.owner.user.username}.`);
  guild.defaultChannel.sendMessage(`Hello! I am Tink, a multipurpose bot for Discord developed by ThePoptartCrpr.\nFor a full list of commands, type !help!\nNeed help? Want the latest announcements? You can join my support server here: https://discord.gg/ZGS9P9G \nNote that I will not always be online, I am currently manually hosted. If I am not online, just wait a bit!\nCurrent version: ${guild.client.version}`);
};
