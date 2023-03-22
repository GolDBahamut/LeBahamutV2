process.on('unhandledRejection', function (e) {
    console.error(e);
  });
  
  // Incluez les différents fichiers
  const { client } = require("./folder1/client");
  const { login } = require("./folder1/config");
  const { data, clearCommand, stop, help } = require("./folder2/command");
  const {
    ready,
    message,
    guildMemberAdd,
    guildMemberRemove,
    guildMemberUpdate,
  } = require("./events");
  
  // Enregistrez les différents événements
  client.on("ready", ready);
  client.on("message", message);
  client.on("guildMemberAdd", guildMemberAdd);
  client.on("guildMemberRemove", guildMemberRemove);
  client.on("guildMemberUpdate", guildMemberUpdate);
  
  // Connectez le client au serveur Discord
  client.login(process.env.BOT_TOKEN);