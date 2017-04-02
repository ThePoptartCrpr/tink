module.exports = member => {
  let guild = member.guild;
  console.log(`${member.user.username} joined server ${guild.name}.`);
};
