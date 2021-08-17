require('dotenv').config()

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = require("./commands");

const adminCommands = ["sendmsg", "accept", "pay"];

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    const allCommandIds = await rest.put(
      Routes.applicationGuildCommands(process.env.DISCORD_CLIENT, process.env.DISCORD_SERVER),
      { body: commands },
    );

    const adminCommandIds = allCommandIds.filter(cmd => adminCommands.includes(cmd.name));
    const permissions = adminCommandIds.map(cmd => ({
      id: cmd.id,
      permissions: [{
        id: "876850548995948544",
        type: 1,
        permission: true,
      }],
    }))



    await rest.put(
      Routes.guildApplicationCommandsPermissions(process.env.DISCORD_CLIENT, process.env.DISCORD_SERVER),
      {
        body: permissions,
        headers: { "Content-Type": "application/json" }
      },
    );

    console.log('Successfully reloaded application (/) commands.');

  } catch (error) {
    console.error(error);
  }



})();

