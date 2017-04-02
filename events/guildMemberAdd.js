module.exports = member => {
  let guild = member.guild;
  console.log(`Welcomed ${member.user.username} to server ${guild.name}.`);
};
