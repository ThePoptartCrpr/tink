const chalk = require('chalk');
module.exports = client => {
  console.log(`${new Date().toLocaleTimeString()} Tink initialized.`);
  client.user.setGame("========--");
};
