module.exports = member => {
  let guild = member.guild;
  console.log(`${member.user.username} has left ${guild.name}.`);
};
